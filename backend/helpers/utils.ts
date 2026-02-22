interface ResponseError extends Error {
  status: number;
}

export function createAndThrowError(message: string = "An unexpected error has occurred", status: number = 500, name: string = "InternalServerError") {
  const error = new Error(message) as ResponseError;
  error.name = name;
  error.status = status;

  throw error;
}