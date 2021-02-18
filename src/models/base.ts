import { Record } from "immutable";

export type ReadonlyRecord<T> = Record<T> & Readonly<T>;
