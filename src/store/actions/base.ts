export type Action<T extends string, P> = Readonly<{
  type: T;
  payload: P;
}>;
