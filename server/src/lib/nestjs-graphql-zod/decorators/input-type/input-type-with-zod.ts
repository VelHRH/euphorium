import { InputType, InputTypeOptions } from '@nestjs/graphql';
import type { AnyZodObject } from 'zod';

import type { Options } from './options.inteface';

import { extractNameAndDescription, parseShape } from '../../helpers';
import { ZodObjectKey } from '../../helpers/constants';

/**
 * Builds an input type decorator for given name and options.
 *
 * @param {string} [name] The name of the property.
 * @param {InputTypeOptions} [opts] The options for the decorator.
 * @return {ClassDecorator} A decorator for the dynamic input type class.
 */
export function buildInputTypeDecorator(
  name?: string,
  opts?: InputTypeOptions,
): ClassDecorator {
  if (typeof opts === 'object') {
    if (typeof name === 'string') {
      return InputType(name, opts);
    }

    return InputType(opts);
  }

  if (typeof name === 'string') {
    return InputType(name);
  }

  return InputType();
}

/**
 * Decorator that marks a class as a GraphQL input type.
 *
 * Uses a `zod` object.
 *
 * @export
 * @template T The type of the zod object input.
 * @param {T} input The zod input object.
 * @return {ClassDecorator} A {@link ClassDecorator}.
 */
export function InputTypeWithZod<T extends AnyZodObject>(
  input: T,
): ClassDecorator;

/**
 * Decorator that marks a class as a GraphQL input type.
 *
 * Uses a `zod` object.
 *
 * @export
 * @template T The type of the zod object input.
 * @param {T} input The zod input object.
 * @param {Options<T>} options The options for the decorator.
 * @return {ClassDecorator} A {@link ClassDecorator}.
 */
export function InputTypeWithZod<T extends AnyZodObject>(
  input: T,
  options: Options<T>,
): ClassDecorator;

/**
 * Decorator that marks a class as a GraphQL input type.
 *
 * Uses a `zod` object.
 *
 * @export
 * @template T The type of the zod object input.
 * @param {T} input The zod input object.
 * @param {string} name The name of the {@link InputType}.
 * @param {Options<T>} [options] The options for the decorator.
 * @return {ClassDecorator} A {@link ClassDecorator}.
 */
export function InputTypeWithZod<T extends AnyZodObject>(
  input: T,
  name: string,
  options?: Options<T>,
): ClassDecorator;

export function InputTypeWithZod<T extends AnyZodObject>(
  input: T,
  nameOrOptions?: string | Options<T>,
  options?: Options<T>,
): ClassDecorator {
  // #region Parameter Normalization - `name`, `zodOptions`, `inputTypeOptions`
  let normalizedOptions = options;
  let normalizedNameOrOptions = nameOrOptions;

  if (typeof normalizedNameOrOptions === 'object') {
    normalizedOptions = normalizedNameOrOptions;
    normalizedNameOrOptions = undefined;
  }

  if (
    normalizedNameOrOptions === null ||
    normalizedNameOrOptions === undefined ||
    normalizedNameOrOptions === ''
  ) {
    normalizedNameOrOptions = normalizedOptions?.name;
  }

  const name = normalizedNameOrOptions;

  let zodOptions = normalizedOptions?.zod;

  let inputTypeOptions: InputTypeOptions | undefined;

  if (typeof normalizedOptions === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name: unusedName, zod: unusedZod, ...rest } = normalizedOptions;

    inputTypeOptions = rest;
  }
  // #endregion

  const decorate = buildInputTypeDecorator(name, inputTypeOptions);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ZodClassDecoratorBase(target: any) {
    zodOptions ??= {};

    const { prototype } = target;

    const { description, name: extractedName = target.name } =
      extractNameAndDescription(input, zodOptions);

    const { keepZodObject: shouldKeepZodObject = false } = zodOptions;

    const returnValue = decorate(target);

    if (shouldKeepZodObject) {
      Object.defineProperty(prototype, ZodObjectKey, {
        value: { ...input },
        configurable: false,
        writable: false,
      });
    }

    const parsed = parseShape(input, {
      ...zodOptions,
      name: extractedName,
      description,
      getDecorator(_, key) {
        // Returning another `@InputType()` as we have another key now, that
        // will be another sub class built, therefore we need to decorate that
        // with another `@InputType()`.
        return buildInputTypeDecorator(key, inputTypeOptions);
      },
      getScalarTypeFor: zodOptions.getScalarTypeFor,
    });

    parsed.forEach(({ descriptor, key, decorateFieldProperty }) => {
      Object.defineProperty(prototype, key, descriptor);
      decorateFieldProperty(prototype as object, key);
    });

    return returnValue as void;
  };
}
