export type DeserializedHash = {
  hash: Buffer;
  params: Record<string, number>;
  salt: Buffer;
};
