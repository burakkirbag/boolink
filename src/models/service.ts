export interface IServiceResult<T> {
  success: boolean;
  message: string;
  data: T | null;
}
