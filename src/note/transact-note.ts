import { poseidon, Signature } from 'circomlibjs';
import { AddressData, decodeAddress, encodeAddress } from '../key-derivation/bech32';
import { ViewingKeyPair } from '../key-derivation/wallet-node';
import {
  Ciphertext,
  LegacyNoteSerialized,
  NoteSerialized,
  OutputType,
  TokenData,
} from '../models/formatted-types';
import { PublicInputs } from '../models/prover-types';
import { MEMO_SENDER_RANDOM_NULL } from '../models/transaction-constants';
import {
  ByteLength,
  chunk,
  combine,
  formatToByteLength,
  hexlify,
  hexToBigInt,
  nToHex,
  randomHex,
} from '../utils/bytes';
import { ciphertextToEncryptedRandomData, encryptedDataToCiphertext } from '../utils/ciphertext';
import { aes } from '../utils/encryption';
import { signEDDSA, unblindNoteKey } from '../utils/keys-utils';
import { unblindNoteKeyLegacy } from '../utils/keys-utils-legacy';
import { LEGACY_MEMO_METADATA_BYTE_CHUNKS, Memo } from './memo';
import { assertValidNoteRandom, getTokenDataHash, NFT_NOTE_VALUE } from './note-util';

/**
 *
 * A Note on Encoded MPKs:
 *
 * The presence of senderRandom field, or an encoded/unencoded MPK in a decrypted note,
 * tells us whether or not the sender address was hidden or visible.
 *
 *          MPK               senderRandom                                Sender address
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Value    Unencoded         Random hex (15)                             Hidden
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Value    Encoded           undefined or MEMO_SENDER_RANDOM_NULL        Visible
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

export class TransactNote {
  // address data of recipient
  readonly receiverAddressData: AddressData;

  // address data of sender
  readonly senderAddressData: Optional<AddressData>;

  // 32 byte hash of token data
  readonly tokenHash: string;

  // 16 byte random
  readonly random: string;

  // value to transfer as bigint
  readonly value: bigint;

  readonly notePublicKey: bigint;

  readonly hash: bigint;

  // This is just the metadata at the start of the memo field.
  readonly annotationData: string;

  readonly memoText: Optional<string>;

  /**
   * Create Note object from values
   * @param {BigInt} receiverAddressData - recipient wallet address data
   * @param {string} random - note randomness
   * @param {string} tokenData - note token ID
   * @param {BigInt} value - note value
   */
  private constructor(
    receiverAddressData: AddressData,
    senderAddressData: Optional<AddressData>,
    random: string,
    value: bigint,
    tokenHash: string,
    annotationData: string,
    memoText: Optional<string>,
  ) {
    assertValidNoteRandom(random);

    this.receiverAddressData = receiverAddressData;
    this.senderAddressData = senderAddressData;

    this.random = random;
    this.tokenHash = tokenHash;
    this.value = BigInt(value);
    this.notePublicKey = this.getNotePublicKey();
    this.hash = this.getHash();
    this.annotationData = annotationData;
    this.memoText = memoText;
  }

  static createTransfer(
    receiverAddressData: AddressData,
    senderAddressData: Optional<AddressData>,
    random: string,
    value: bigint,
    tokenHash: string,
    senderViewingKeys: ViewingKeyPair,
    showSenderAddressToRecipient: boolean,
    outputType: OutputType,
    memoText: Optional<string>,
  ): TransactNote {
    // See note at top of file.
    const shouldCreateSenderRandom = !showSenderAddressToRecipient;
    const senderRandom = shouldCreateSenderRandom ? randomHex(15) : MEMO_SENDER_RANDOM_NULL;

    const annotationData = Memo.createEncryptedNoteAnnotationData(
      outputType,
      senderRandom,
      senderViewingKeys.privateKey,
    );

    return new TransactNote(
      receiverAddressData,
      senderAddressData,
      random,
      value,
      tokenHash,
      annotationData,
      memoText,
    );
  }

  static createNFTTransfer(
    receiverAddressData: AddressData,
    senderAddressData: Optional<AddressData>,
    random: string,
    tokenData: TokenData,
    senderViewingKeys: ViewingKeyPair,
    showSenderAddressToRecipient: boolean,
    memoText: Optional<string>,
  ): TransactNote {
    const tokenHash = getTokenDataHash(tokenData);

    return TransactNote.createTransfer(
      receiverAddressData,
      senderAddressData,
      random,
      NFT_NOTE_VALUE,
      tokenHash,
      senderViewingKeys,
      showSenderAddressToRecipient,
      OutputType.Transfer,
      memoText,
    );
  }

  private getNotePublicKey(): bigint {
    return poseidon([this.receiverAddressData.masterPublicKey, hexToBigInt(this.random)]);
  }

  getSenderAddress(): Optional<string> {
    if (!this.senderAddressData) {
      return undefined;
    }
    return encodeAddress(this.senderAddressData);
  }

  /**
   * Get note hash
   * @returns {bigint} hash
   */
  private getHash(): bigint {
    return poseidon([this.notePublicKey, hexToBigInt(this.tokenHash), this.value]);
  }

  /**
   * Sign a transaction
   *
   * @param {PublicInputs} publicInputs - transaction merkle root
   * @returns {Signature} signature
   */
  static sign(publicInputs: PublicInputs, spendingKeyPrivate: Uint8Array): Signature {
    const entries = Object.values(publicInputs).flatMap((x) => x);
    const msg = poseidon(entries);
    return signEDDSA(spendingKeyPrivate, msg);
  }

  /**
   * AES-256-GCM encrypts note data
   * @param sharedKey - key to encrypt with
   */
  encrypt(
    sharedKey: Uint8Array,
    senderMasterPublicKey: bigint,
    senderRandom: Optional<string>,
  ): {
    noteCiphertext: Ciphertext;
    noteMemo: string;
    annotationData: string;
  } {
    const prefix = false;
    const { token, value, random } = this.formatFields(prefix);

    const receiverMasterPublicKey = this.receiverAddressData.masterPublicKey;

    // Encode the master public key only if the senderRandom is unset (sender wants address to be visible by receiver).
    const encodedMasterPublicKey = TransactNote.getEncodedMasterPublicKey(
      senderRandom,
      receiverMasterPublicKey,
      senderMasterPublicKey,
    );

    const encodedMemoText = Memo.encodeMemoText(this.memoText);
    const ciphertext = aes.gcm.encrypt(
      [
        nToHex(encodedMasterPublicKey, ByteLength.UINT_256),
        token,
        `${random}${value}`,
        encodedMemoText,
      ],
      sharedKey,
    );

    return {
      noteCiphertext: {
        ...ciphertext,
        data: ciphertext.data.slice(0, 3), // Remove encrypted memo text.
      },
      noteMemo: ciphertext.data[3],
      annotationData: this.annotationData,
    };
  }

  private static unblindViewingPublicKey(
    random: string,
    blindedViewingPublicKey: Optional<Uint8Array>,
    senderRandom: Optional<string>,
    isLegacyDecryption: boolean,
  ): Uint8Array {
    if (blindedViewingPublicKey && senderRandom) {
      const unblinded = isLegacyDecryption
        ? unblindNoteKeyLegacy(blindedViewingPublicKey, random, senderRandom)
        : unblindNoteKey(blindedViewingPublicKey, random, senderRandom);
      if (unblinded) {
        return unblinded;
      }
    }
    return new Uint8Array(); // dummy
  }

  /**
   * AES-256-GCM decrypts note data
   */
  static decrypt(
    currentWalletAddressData: AddressData,
    noteCiphertext: Ciphertext,
    sharedKey: Uint8Array,
    memo: string,
    annotationData: string,
    blindedReceiverViewingKey: Optional<Uint8Array>,
    blindedSenderViewingKey: Optional<Uint8Array>,
    senderRandom: Optional<string>,
    isSentNote: boolean,
    isLegacyDecryption: boolean,
  ): TransactNote {
    const ciphertextDataWithMemoText = [...noteCiphertext.data, memo];
    const fullCiphertext: Ciphertext = {
      ...noteCiphertext,
      data: ciphertextDataWithMemoText,
    };

    // Decrypt values
    const decryptedValues = aes.gcm
      .decrypt(fullCiphertext, sharedKey)
      .map((value) => hexlify(value));

    return this.noteFromDecryptedValues(
      currentWalletAddressData,
      decryptedValues,
      annotationData,
      blindedReceiverViewingKey,
      blindedSenderViewingKey,
      senderRandom,
      isSentNote,
      isLegacyDecryption,
    );
  }

  static getDecodedMasterPublicKey(
    currentWalletMasterPublicKey: bigint,
    encodedMasterPublicKey: bigint,
    senderRandom: Optional<string>,
    isLegacyDecryption: boolean,
  ): bigint {
    if (isLegacyDecryption || (senderRandom && senderRandom !== MEMO_SENDER_RANDOM_NULL)) {
      return encodedMasterPublicKey; // Unencoded
    }
    return encodedMasterPublicKey ^ currentWalletMasterPublicKey;
  }

  static getEncodedMasterPublicKey(
    senderRandom: Optional<string>,
    receiverMasterPublicKey: bigint,
    senderMasterPublicKey: bigint,
  ): bigint {
    return senderRandom && senderRandom !== MEMO_SENDER_RANDOM_NULL
      ? receiverMasterPublicKey // Unencoded
      : receiverMasterPublicKey ^ senderMasterPublicKey;
  }

  private static noteFromDecryptedValues(
    currentWalletAddressData: AddressData,
    decryptedValues: string[],
    annotationData: string,
    blindedReceiverViewingKey: Optional<Uint8Array>,
    blindedSenderViewingKey: Optional<Uint8Array>,
    senderRandom: Optional<string>,
    isSentNote: boolean,
    isLegacyDecryption: boolean,
  ) {
    // Decrypted Values:
    // 0: Master Public Key (Encoded)
    // 1: Token Address
    // 2: Value
    // 3 (+ more array values for legacy): Optional Memo string

    const random = decryptedValues[2].substring(0, 32);
    const value = hexToBigInt(decryptedValues[2].substring(32, 64));
    const tokenHash = decryptedValues[1];
    const memoText = Memo.decodeMemoText(combine(decryptedValues.slice(3)));

    const encodedMasterPublicKey = hexToBigInt(decryptedValues[0]);

    if (isSentNote) {
      // SENT note.
      const receiverAddressData: AddressData = {
        masterPublicKey: TransactNote.getDecodedMasterPublicKey(
          currentWalletAddressData.masterPublicKey,
          encodedMasterPublicKey,
          senderRandom,
          isLegacyDecryption,
        ),
        viewingPublicKey: TransactNote.unblindViewingPublicKey(
          random,
          blindedReceiverViewingKey,
          senderRandom,
          isLegacyDecryption,
        ),
      };
      return new TransactNote(
        receiverAddressData,
        currentWalletAddressData,
        random,
        value,
        tokenHash,
        annotationData,
        memoText,
      );
    }

    // RECEIVE note.
    // Master public key will be encoded (different) if the sender wants address to be visible by receiver.

    const senderAddressVisible =
      encodedMasterPublicKey !== currentWalletAddressData.masterPublicKey;

    const senderAddressData: Optional<AddressData> = senderAddressVisible
      ? {
          masterPublicKey: TransactNote.getDecodedMasterPublicKey(
            currentWalletAddressData.masterPublicKey,
            encodedMasterPublicKey,
            undefined, // Sender is not blinded, null senderRandom.
            isLegacyDecryption,
          ),
          viewingPublicKey: TransactNote.unblindViewingPublicKey(
            random,
            blindedSenderViewingKey,
            MEMO_SENDER_RANDOM_NULL, // Sender is not blinded, null senderRandom.
            isLegacyDecryption,
          ),
        }
      : undefined;
    return new TransactNote(
      currentWalletAddressData,
      senderAddressData,
      random,
      value,
      tokenHash,
      annotationData,
      memoText,
    );
  }

  private formatFields(prefix: boolean = false) {
    return {
      npk: nToHex(this.notePublicKey, ByteLength.UINT_256, prefix),
      token: formatToByteLength(this.tokenHash, ByteLength.UINT_256, prefix),
      value: nToHex(BigInt(this.value), ByteLength.UINT_128, prefix),
      random: formatToByteLength(this.random, ByteLength.UINT_128, prefix),
      annotationData: this.annotationData,
    };
  }

  /**
   * Gets JSON serialized version of note
   * @returns serialized note
   */
  serialize(prefix?: boolean): NoteSerialized {
    const { npk, token, value, random, annotationData } = this.formatFields(prefix);
    return {
      npk,
      token,
      value,
      random,
      annotationData,
      recipientAddress: encodeAddress(this.receiverAddressData),
      senderAddress: this.senderAddressData ? encodeAddress(this.senderAddressData) : undefined,
      memoText: this.memoText,
    };
  }

  serializeLegacy(viewingPrivateKey: Uint8Array, prefix?: boolean): LegacyNoteSerialized {
    const { npk, token, value, random } = this.formatFields(prefix);
    const memoField: string[] = chunk(this.annotationData).map((el) =>
      formatToByteLength(el, ByteLength.UINT_256, prefix),
    );
    const randomCiphertext = aes.gcm.encrypt([random], viewingPrivateKey);
    const [ivTag, data] = ciphertextToEncryptedRandomData(randomCiphertext);

    return {
      npk,
      token,
      value,
      encryptedRandom: [ivTag, data].map((v) => hexlify(v, prefix)) as [string, string],
      memoField,
      recipientAddress: encodeAddress(this.receiverAddressData),
      memoText: this.memoText,
    };
  }

  static isLegacyTransactNote(noteData: NoteSerialized | LegacyNoteSerialized): boolean {
    return 'encryptedRandom' in noteData;
  }

  /**
   * Creates note from serialized note JSON
   * @param noteData - serialized note data
   * @param viewingPrivateKey - viewing private key for decryption
   * @returns TransactNote
   */
  static deserialize(
    noteData: NoteSerialized | LegacyNoteSerialized,
    viewingPrivateKey: Uint8Array,
  ): TransactNote {
    if ('encryptedRandom' in noteData) {
      // LegacyNoteSerialized type.
      return TransactNote.deserializeLegacy(noteData, viewingPrivateKey);
    }

    // NoteSerialized type.
    return new TransactNote(
      decodeAddress(noteData.recipientAddress),
      noteData.senderAddress ? decodeAddress(noteData.senderAddress) : undefined,
      hexlify(noteData.random),
      hexToBigInt(noteData.value),
      hexlify(noteData.token),
      noteData.annotationData,
      noteData.memoText || undefined,
    );
  }

  /**
   * Creates note from serialized note JSON
   * @param noteData - serialized note data
   * @param viewingPrivateKey - viewing private key for decryption
   * @returns TransactNote
   */
  private static deserializeLegacy(
    noteData: LegacyNoteSerialized,
    viewingPrivateKey: Uint8Array,
  ): TransactNote {
    const randomCiphertext = encryptedDataToCiphertext(noteData.encryptedRandom);
    const decryptedRandom = aes.gcm.decrypt(randomCiphertext, viewingPrivateKey);

    const annotationDataChunked = noteData.memoField
      ? noteData.memoField.slice(0, LEGACY_MEMO_METADATA_BYTE_CHUNKS)
      : [];
    const annotationData: string = combine(annotationDataChunked);

    return new TransactNote(
      decodeAddress(noteData.recipientAddress),
      undefined, // senderAddress
      combine(decryptedRandom),
      hexToBigInt(noteData.value),
      hexlify(noteData.token),
      annotationData,
      noteData.memoText || undefined,
    );
  }

  /**
   * Calculates nullifier for a given note
   * @param nullifyingKey - nullifying key
   * @param leafIndex - Index of note's commitment in the Merkle tree
   * @returns nullifier (hex string)
   */
  static getNullifier(nullifyingKey: bigint, leafIndex: number): bigint {
    return poseidon([nullifyingKey, BigInt(leafIndex)]);
  }

  newProcessingNoteWithValue(value: bigint): TransactNote {
    return new TransactNote(
      this.receiverAddressData,
      this.senderAddressData,
      randomHex(16),
      value,
      this.tokenHash,
      this.annotationData,
      this.memoText,
    );
  }
}