export interface IRequestResponse<T> {
  status: '1' | '0';
  message: 'OK';
  result: T;
}
