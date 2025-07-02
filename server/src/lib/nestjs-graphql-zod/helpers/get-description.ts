import { ZodType } from 'zod';

import { iterateZodLayers } from './unwrap';

/**
 * Extracts the description from a given type.
 *
 * The given input may also be wrapped more than one time with the ones listed
 * above. Therefore, assuming there is a value which
 * is `Nullable<Array<Number>>` and there is no description associated to the
 * nullable and the array wrappers, the description will still tried to be
 * extracted from the number instance.
 *
 * @template T The type of the zod object.
 * @param {T} [input] The zod object input.
 * @return {(string | undefined)} The description of the input or `undefined.`
 */
export function getDescription<T extends ZodType>(
  input?: T,
): string | undefined {
  if (!input) {
    return;
  }

  if (
    input.description !== null &&
    input.description !== undefined &&
    input.description !== ''
  ) {
    return input.description;
  }

  const layers = Array.from(iterateZodLayers(input));

  const layerWithDescription = layers.find(
    (layer) =>
      layer.description !== null &&
      layer.description !== undefined &&
      layer.description !== '',
  );

  return layerWithDescription?.description;
}
