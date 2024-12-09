import * as crypto from 'node:crypto';

import { KEY_LENGTH, SCRYPT_OPTIONS, SCRYPT_PREFIX } from './crypto.constants';
import { DeserializedHash } from './crypto.types';

export class CryptoService {
  public hashPassword(password: string, saltLength: number): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(saltLength, (err, salt) => {
        if (err) {
          reject(err);

          return;
        }

        crypto.scrypt(
          password,
          salt,
          KEY_LENGTH,
          SCRYPT_OPTIONS,
          (error, hash) => {
            if (error) {
              reject(error);

              return;
            }

            resolve(this.serializeHash(hash, salt));
          },
        );
      });
    });
  }

  public comparePasswords(
    password: string,
    serializedHash: string,
  ): Promise<boolean> {
    const { params, salt, hash } = this.deserializeHash(serializedHash);

    return new Promise((resolve, reject) => {
      const callback: (err: Error | null, derivedKey: Buffer) => void = (
        err,
        hashedPassword,
      ) => {
        if (err) {
          reject(err);

          return;
        }

        resolve(crypto.timingSafeEqual(hashedPassword, hash));
      };

      crypto.scrypt(password, salt, hash.length, params, callback);
    });
  }

  private serializeHash(hash: Buffer, salt: Buffer): string {
    const saltString = salt.toString('base64').split('=')[0];
    const hashString = hash.toString('base64').split('=')[0];

    return `${SCRYPT_PREFIX}${saltString}$${hashString}`;
  }

  private deserializeHash(phc: string): DeserializedHash {
    const [, name, options, salt64, hash64] = phc.split('$');

    if (name !== 'scrypt') {
      throw new Error('Wrong hash algorithm');
    }

    const params = this.parseOptions(options);
    const salt = Buffer.from(salt64, 'base64');
    const hash = Buffer.from(hash64, 'base64');

    return { params, salt, hash };
  }

  private parseOptions(options: string): Record<string, number> {
    const items = options.split(',');

    const values = items.map((item) => {
      const [key, val] = item.split('=');

      return [key, Number(val)];
    });

    return Object.fromEntries(values) as Record<string, number>;
  }
}
