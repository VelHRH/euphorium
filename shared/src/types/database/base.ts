export interface Base {
  createdAt: Date;
  id: number;
  updatedAt: Date;
}

export type BaseKeys = keyof Base;
