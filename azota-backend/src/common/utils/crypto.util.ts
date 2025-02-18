import * as CryptoJS from "crypto-js";

export class CryptoUtil {
  static encrypt(key: string, content: string): string {
    return CryptoJS.AES.encrypt(content, key).toString();
  }

  static decrypt(key: string, ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
