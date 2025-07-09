import { HttpException, HttpStatus } from '@nestjs/common';

export function normalizeError(error: unknown): HttpException {
  // If the error is already an HttpException, just return it as is
  if (error instanceof HttpException) return error;

  // If it's a standard JavaScript error (like TypeError), wrap with 400 Bad Request
  if (error instanceof Error) {
    return new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }

  // For completely unknown values (e.g. throw 'something'), return a generic 500
  return new HttpException(
    'Unexpected error',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}
