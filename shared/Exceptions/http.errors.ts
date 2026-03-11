import { BaseError } from "./base.error";

export class BadRequestError extends BaseError {
  statusCode = 400;
  constructor(message: string = "Yanlış sorğu") {
    super(message);
  }
}
export class InternalServerError extends BaseError {
  statusCode = 500;
  constructor(message: string = "Server xətası") {
    super(message);
  }
}

export class NotFoundError extends BaseError {
  statusCode = 404;
  constructor(message: string = "Resurs tapılmadı") {
    super(message);
  }
}

export class ConflictError extends BaseError {
  statusCode = 409;
  constructor(message: string = "Məlumat artıq mövcuddur") {
    super(message);
  }
}

export class UnauthorizedError extends BaseError {
  statusCode = 401;
  constructor(message: string = "İmtiyazınız çatmır") {
    super(message);
  }
}