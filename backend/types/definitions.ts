type StatusCode = 200 | 201 | 400 | 401 | 404 | 409 | 429 | 500
type State = "success" | "fail" | "error"
export interface CustomHttpError extends Omit<Error, "name" | "message">, APIResponse { name?: string, message: string | undefined }

export interface APIResponse {
  state: State;
  status: StatusCode;
  message?: string | undefined;
  data?: unknown;
}

export interface UserJWTPayload {
  id: number;
  role: string;
  email: string;
  firstname?: string;
  lastname?: string;
}