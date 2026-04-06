import { CustomHttpError } from "@/types/definitions";

export function createAndThrowHttpError({ message = "An unexpected error has occurred", state = "error", status = 500, name = "InternalServerError", data }: CustomHttpError): never {
  const error = new Error(message) as CustomHttpError;
  error.name = name;
  error.state = state
  error.status = status;
  error.data = data;
  throw error;
}