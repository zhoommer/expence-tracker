export declare class CustomException extends Error {
    readonly statusCode: number;
    readonly errorDetails?: any;
    constructor(message: string, statusCode: number, errorDetails?: any);
}
