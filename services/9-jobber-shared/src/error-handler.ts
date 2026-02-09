import { StatusCodes } from 'http-status-codes';

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}

export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  readonly status: string = 'error';
  readonly comingFrom: string;

  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;

    // Fix prototype chain for instanceof
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom,
    };
  }
}

export class BadRequestError extends CustomError {
  readonly statusCode = StatusCodes.BAD_REQUEST;
}

export class NotFoundError extends CustomError {
  readonly statusCode = StatusCodes.NOT_FOUND;
}

export class NotAuthorizedError extends CustomError {
  readonly statusCode = StatusCodes.UNAUTHORIZED;
}

export class FileTooLargeError extends CustomError {
  readonly statusCode = StatusCodes.REQUEST_TOO_LONG;
}

export class ServerError extends CustomError {
  readonly statusCode = StatusCodes.SERVICE_UNAVAILABLE;
}

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}
