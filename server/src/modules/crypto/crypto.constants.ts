const MEMORY_UNIT = 1024;
const MEMORY_MULTIPLIER = 64;
const MAX_MEMORY = MEMORY_MULTIPLIER * MEMORY_UNIT * MEMORY_UNIT;

export const KEY_LENGTH = 64;

export const SCRYPT_OPTIONS = {
  N: 32768,
  r: 8,
  p: 1,
  maxmem: MAX_MEMORY,
};

export const SCRYPT_PREFIX = `$scrypt$N=${SCRYPT_OPTIONS.N},r=${SCRYPT_OPTIONS.r},p=${SCRYPT_OPTIONS.p},maxmem=${SCRYPT_OPTIONS.maxmem}$`;
