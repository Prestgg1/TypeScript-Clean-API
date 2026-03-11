// shared/src/errors/base.error.ts
export abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(public override message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      status: this.statusCode,
    };
  }
}