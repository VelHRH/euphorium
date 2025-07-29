import { AnyZodObject, ZodDefault, ZodObject, ZodTypeAny } from 'zod';

import { isZodInstance } from './is-zod-instance';

/**
 * Generates the default vales for given input.
 *
 * @export
 * @template T The type of the input.
 * @param {T} input The input.
 * @return {*} A record containing keys and the zod
 * values with defaults.
 */
export function generateDefaults<T extends ZodTypeAny>(input: T): unknown {
  if (isZodInstance(ZodObject, input)) {
    const objectInput = input as AnyZodObject;
    const { shape } = objectInput;
    const result: Record<string, unknown> = {};

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.keys(shape).forEach((key) => {
      const zodType = shape[key as keyof typeof shape] as ZodTypeAny;
      const defaultValue = generateDefaults<ZodTypeAny>(zodType);

      if (defaultValue !== null && defaultValue !== undefined) {
        result[key] = defaultValue;
      }
    });

    return result;
  }

  if (isZodInstance(ZodDefault, input)) {
    const { defaultValue } = input._def;

    if (typeof defaultValue === 'function') {
      try {
        return (defaultValue as () => unknown)();
      } catch {
        return undefined;
      }
    }

    return defaultValue;
  }

  return undefined;
}
