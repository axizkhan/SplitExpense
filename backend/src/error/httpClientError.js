export class HttpClientError extends Error {
    constructor(httpCode, error_messsge, error_code) {
        super(error_messsge);
        this.httpCode = httpCode;
        this.error_message = error_messsge;
        this.error_code = error_code;
        this.isOperational = true;
    }
}
export class BadRequest extends HttpClientError {
    constructor(customMessage = "Bad Request") {
        super(400, customMessage, "BAD_REQUEST");
    }
}
export class Unauthorized extends HttpClientError {
    constructor(customMessage = "Unauthorized", error_code = "UNAUTHORIZED") {
        super(401, customMessage, error_code);
    }
}
export class Forbidden extends HttpClientError {
    constructor(customMessage = "Forbidden") {
        super(403, customMessage, "FORBIDDEN");
    }
}
export class NotFound extends HttpClientError {
    constructor(customMessage = "Data Not Found", error_code = "DATA_NOT_FOUND") {
        super(404, customMessage, error_code);
    }
}
export class MethodNotAllowed extends HttpClientError {
    constructor(customMessage = "Method Not Allowed") {
        super(405, customMessage, "METHOD_NOT_ALLOWED");
    }
}
export class Conflict extends HttpClientError {
    constructor(customMessage = "Conflict", error_code = "CONFLICT") {
        super(409, customMessage, error_code);
    }
}
export class UnprocessableEntity extends HttpClientError {
    constructor(customMessage = "Unprocessable Entity") {
        super(422, customMessage, "UNPROCESSABLE_ENTITY");
    }
}
export class TooManyRequests extends HttpClientError {
    constructor(customMessage = "Too Many Requests") {
        super(429, customMessage, "TOO_MANY_REQUESTS");
    }
}
