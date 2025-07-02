import type { Type } from '@nestjs/common';
import type { ZodTypeAny } from 'zod';

/**
 * Checks whether the given `input` is instance of given `classType`.
 *
 * @export
 * @template T The type of the input.
 * @param {T} classType The class type.
 * @param {object} input The object input.
 * @return {input is InstanceType<T>} A boolean value indicating if the
 * input is instance of given class.
 */
export function isZodInstance<T extends Type<ZodTypeAny>>(
  classType: T,
  input: object,
): input is InstanceType<T> {
  return classType.name === input.constructor.name;
}
