export class CustomError extends Error {
  status: number;
  code: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.status = status || 500;
    this.code = code || "INTERNAL_SERVER_ERROR";
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, code = "NOT_FOUND") {
    super(message, 404, code);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string, code = "BAD_REQUEST") {
    super(message, 400, code);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string, code = "INTERNAL_SERVER_ERROR") {
    super(message, 500, code);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string, code = "UNAUTHORIZED") {
    super(message, 401, code);
  }
}
