export interface Base {
  createdAt: Date;
  id: string;
  updatedAt: Date;
}

export type BaseKeys = keyof Base;
