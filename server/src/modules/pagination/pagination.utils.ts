export function encodeCursor(value: string | number | Date): string {
  return Buffer.from(String(value)).toString('base64');
}

export function decodeCursor(cursor: string): string {
  return Buffer.from(cursor, 'base64').toString();
}
