import { CTRCiphertext, EncryptedNoteExtraData, NoteExtraData } from '../models/formatted-types';
import { MEMO_SENDER_BLINDING_KEY_NULL } from '../transaction/constants';
import { encryption } from '../utils';
import { arrayify, ByteLength, chunk, combine, hexlify, nToHex, padToLength } from '../utils/bytes';

export const MEMO_METADATA_BYTE_CHUNKS = 1;

export class Memo {
  static decryptNoteExtraData(
    memoField: string[],
    viewingPrivateKey: Uint8Array,
  ): Optional<NoteExtraData> {
    if (!memoField || !memoField.length) {
      return undefined;
    }

    try {
      const metadataField: string = memoField[0];
      const metadataCiphertext = {
        iv: metadataField.substring(0, 32),
        data: [metadataField.substring(32, 64)],
      };
      const decryptedMetadata: string = encryption.aes.ctr.decrypt(
        metadataCiphertext,
        viewingPrivateKey,
      )[0];

      const noteExtraData: NoteExtraData = {
        outputType: parseInt(decryptedMetadata.substring(0, 2), 16),
        senderBlindingKey: decryptedMetadata.substring(2, 32),
      };
      return noteExtraData;
    } catch (err) {
      return undefined;
    }
  }

  static decryptSenderBlindingKey = (
    memoField: string[],
    viewingPrivateKey: Uint8Array,
  ): string => {
    const noteExtraData = Memo.decryptNoteExtraData(memoField, viewingPrivateKey);
    return noteExtraData ? noteExtraData.senderBlindingKey : MEMO_SENDER_BLINDING_KEY_NULL;
  };

  private static createEncryptedNoteExtraData(
    noteExtraData: NoteExtraData,
    viewingPrivateKey: Uint8Array,
  ): string {
    const outputTypeFormatted = nToHex(BigInt(noteExtraData.outputType), ByteLength.UINT_8); // 1 byte
    const senderBlindingKeyFormatted = noteExtraData.senderBlindingKey; // 15 bytes
    const metadataField: string = `${outputTypeFormatted}${senderBlindingKeyFormatted}`;
    if (metadataField.length !== 32) {
      throw new Error('Metadata field must be 16 bytes.');
    }

    const metadataCiphertext: CTRCiphertext = encryption.aes.ctr.encrypt(
      [metadataField],
      viewingPrivateKey,
    );

    return `${metadataCiphertext.iv}${metadataCiphertext.data.join('')}`;
  }

  static encryptNoteExtraData(
    noteExtraData: NoteExtraData,
    viewingPrivateKey: Uint8Array,
  ): EncryptedNoteExtraData {
    const metadataField: string = this.createEncryptedNoteExtraData(
      noteExtraData,
      viewingPrivateKey,
    );
    return [metadataField];
  }

  static encodeSplitMemoText(memoText: Optional<string>): string[] {
    if (!memoText) {
      return [];
    }
    const encoded = hexlify(new TextEncoder().encode(memoText));
    const chunked = chunk(encoded);

    const lastChunk = chunked[chunked.length - 1];
    const paddedLastChunk = padToLength(lastChunk, ByteLength.UINT_256) as string;

    return [...chunked.slice(0, -1), paddedLastChunk];
  }

  static decodeMemoText(encoded: string[]): Optional<string> {
    if (!encoded.length) {
      return undefined;
    }

    const combined = combine(encoded);
    // eslint-disable-next-line no-control-regex
    return new TextDecoder().decode(Buffer.from(arrayify(combined))).replace(/\u0000/g, '');
  }
}
