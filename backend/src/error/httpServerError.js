export class HttpServerError extends Error {
    constructor(statusCode, errorMessage, errorCode) {
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.isOperational = true;
    }
}
export class InternalServerError extends HttpServerError {
    constructor(errorMessage = "Internal Server Error") {
        super(500, errorMessage, "INTERNAL_SERVER_ERROR");
    }
}
export class NotImplemented extends HttpServerError {
    constructor(errorMessage = "Not Implemented") {
        super(501, errorMessage, "NOT_IMPLEMENTED");
    }
}
export class BadGateway extends HttpServerError {
    constructor(errorMessage = "Bad Gateway") {
        super(502, errorMessage, "BAD_GATEWAY");
    }
}
export class ServiceUnavailable extends HttpServerError {
    constructor(errorMessage = "Service Unavailable") {
        super(503, errorMessage, "SERVICE_UNAVAILABLE");
    }
}
export class GatewayTimeout extends HttpServerError {
    constructor(errorMessage = "Gateway Timeout") {
        super(504, errorMessage, "GATEWAY_TIMEOUT");
    }
}
