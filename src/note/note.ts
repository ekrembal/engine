import { Signature } from 'circomlibjs';
import { AddressData, decode, encode } from '../keyderivation/bech32-encode';
import { BigIntish, Ciphertext, NoteSerialized, TokenType } from '../models/formatted-types';
import { PublicInputs } from '../prover/types';
import { encryption, keysUtils } from '../utils';
import {
  ByteLength,
  formatToByteLength,
  hexlify,
  hexToBigInt,
  nToHex,
  randomHex,
} from '../utils/bytes';
import { ciphertextToEncryptedRandomData, encryptedDataToCiphertext } from '../utils/ciphertext';
import { poseidon } from '../utils/hash';
import { unblindEphemeralKey } from '../utils/keys-utils';

export class Note {
  // address data of recipient
  readonly addressData: AddressData;

  // viewing public key (VPK) of recipient - ed25519 curve
  readonly viewingPublicKey: Uint8Array;

  // master public key (VPK) of recipient
  readonly masterPublicKey: bigint;

  // 32 byte token address
  readonly token: string;

  // 16 byte random
  readonly random: string;

  // value to transfer as bigint
  readonly value: bigint;

  readonly notePublicKey: bigint;

  readonly hash: bigint;

  readonly memoField: string[];

  /**
   * Create Note object from values
   * @param {BigInt} addressData - recipient wallet address data
   * @param {BigInt} random - note randomness
   * @param {string} token - note token ID
   * @param {BigInt} value - note value
   */
  constructor(
    addressData: AddressData,
    random: string,
    value: BigIntish,
    token: string,
    memoField: string[],
  ) {
    Note.assertValidRandom(random);

    this.addressData = addressData;
    this.masterPublicKey = addressData.masterPublicKey;
    this.viewingPublicKey = addressData.viewingPublicKey;
    this.random = random;
    this.token = formatToByteLength(token, ByteLength.UINT_256);
    this.value = BigInt(value);
    this.notePublicKey = this.getNotePublicKey();
    this.hash = this.getHash();
    this.memoField = memoField;
  }

  get valueHex(): string {
    return nToHex(this.value, ByteLength.UINT_128);
  }

  private getNotePublicKey(): bigint {
    return poseidon([this.masterPublicKey, hexToBigInt(this.random)]);
  }

  /**
   * Get note hash
   * @returns {bigint} hash
   */
  private getHash(): bigint {
    return poseidon([this.notePublicKey, hexToBigInt(this.token), this.value]);
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
    return keysUtils.signEDDSA(spendingKeyPrivate, msg);
  }

  /**
   * AES-256-GCM encrypts note data
   * @param sharedKey - key to encrypt with
   */
  encrypt(sharedKey: Uint8Array): Ciphertext {
    const { masterPublicKey, token, random, value } = this.format(false);
    // Encrypt in order and return
    return encryption.aes.gcm.encrypt([masterPublicKey, token, `${random}${value}`], sharedKey);
  }

  private static unblindReceiverViewingPublicKey(
    random: string,
    ephemeralKeySender: Optional<Uint8Array>,
    senderBlindingKey: Optional<string>,
  ): Uint8Array {
    if (ephemeralKeySender && senderBlindingKey) {
      const unblinded = unblindEphemeralKey(ephemeralKeySender, random, senderBlindingKey);
      if (unblinded) {
        return unblinded;
      }
    }
    return new Uint8Array(); // dummy
  }

  /**
   * AES-256-GCM decrypts note data
   * @param encryptedNote - encrypted note data
   * @param sharedKey - key to decrypt with
   */
  static decrypt(
    encryptedNote: Ciphertext,
    sharedKey: Uint8Array,
    memoField: string[],
    ephemeralKeySender: Optional<Uint8Array>,
    senderBlindingKey: Optional<string>,
  ): Note {
    // Decrypt values
    const decryptedValues = encryption.aes.gcm
      .decrypt(encryptedNote, sharedKey)
      .map((value) => hexlify(value));

    const random = decryptedValues[2].substring(0, 32);

    const addressData = {
      masterPublicKey: hexToBigInt(decryptedValues[0]),
      viewingPublicKey: this.unblindReceiverViewingPublicKey(
        random,
        ephemeralKeySender,
        senderBlindingKey,
      ),
    };

    const value = hexToBigInt(decryptedValues[2].substring(32, 64));
    const tokenAddress = decryptedValues[1];

    return new Note(addressData, random, value, tokenAddress, memoField);
  }

  private format(prefix: boolean = false) {
    return {
      masterPublicKey: nToHex(this.masterPublicKey, ByteLength.UINT_256, prefix),
      npk: nToHex(this.notePublicKey, ByteLength.UINT_256, prefix),
      token: formatToByteLength(this.token, ByteLength.UINT_256, prefix),
      value: formatToByteLength(this.valueHex, ByteLength.UINT_128, prefix),
      random: formatToByteLength(this.random, ByteLength.UINT_128, prefix),
      memoField: this.memoField.map((el) => formatToByteLength(el, ByteLength.UINT_256, prefix)),
    };
  }

  /**
   * Gets JSON serialized version of note
   * @param viewingPrivateKey - viewing private key for decryption
   * @returns serialized note
   */
  serialize(viewingPrivateKey: Uint8Array, prefix?: boolean): NoteSerialized {
    const { npk, token, value, random, memoField } = this.format(prefix);
    const ciphertext = encryption.aes.gcm.encrypt([random], viewingPrivateKey);
    const [ivTag, data] = ciphertextToEncryptedRandomData(ciphertext);

    return {
      npk,
      token,
      value,
      encryptedRandom: [ivTag, data].map((v) => hexlify(v, prefix)) as [string, string],
      memoField,
      recipientAddress: encode(this.addressData),
    };
  }

  /**
   * Creates note from serialized note JSON
   * @param noteData - serialized note data
   * @param viewingPrivateKey - viewing private key for decryption
   * @returns Note
   */
  static deserialize(noteData: NoteSerialized, viewingPrivateKey: Uint8Array): Note {
    const ciphertext = encryptedDataToCiphertext(noteData.encryptedRandom);
    const decryptedRandom = encryption.aes.gcm.decrypt(ciphertext, viewingPrivateKey);
    const ivTag = decryptedRandom[0];
    // Call hexlify to ensure all note data isn't 0x prefixed
    return new Note(
      decode(noteData.recipientAddress),
      hexlify(ivTag),
      hexToBigInt(noteData.value),
      hexlify(noteData.token),
      noteData.memoField ? noteData.memoField.map((el) => hexlify(el)) : [],
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

  static assertValidRandom(random: string) {
    if (hexlify(random, false).length !== 32) {
      throw new Error(`Random must be length 32 (16 bytes). Got ${hexlify(random, false)}.`);
    }
  }

  static assertValidToken(token: string, tokenType: TokenType) {
    switch (tokenType) {
      case TokenType.ERC20: {
        if (hexlify(token, false).length !== 40 && hexlify(token, false).length !== 64) {
          throw new Error(
            `ERC20 token must be length 40 (20 bytes) or 64 (32 bytes). Got ${hexlify(
              token,
              false,
            )}.`,
          );
        }
        break;
      }
      case TokenType.ERC721: {
        if (hexlify(token, false).length !== 64) {
          throw new Error(`NFT token must be length 64 (32 bytes). Got ${hexlify(token, false)}.`);
        }
        break;
      }
      case TokenType.ERC1155: {
        if (hexlify(token, false).length !== 64) {
          throw new Error(`Random must be length 64 (32 bytes). Got ${hexlify(token, false)}.`);
        }
        break;
      }
      default: {
        throw new Error('Unhandled token type.');
      }
    }
  }

  newProcessingNoteWithValue(value: bigint): Note {
    return new Note(this.addressData, randomHex(16), value, this.token, []);
  }
}
