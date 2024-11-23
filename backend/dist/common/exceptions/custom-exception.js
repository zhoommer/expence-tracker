"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
class CustomException extends Error {
    constructor(message, statusCode, errorDetails) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errorDetails = errorDetails;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=custom-exception.js.map