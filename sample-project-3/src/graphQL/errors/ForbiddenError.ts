export class ForbiddenError extends Error {
    private readonly _message: string;
    private readonly _code: number;

    constructor(message: string) {
        super(message);
        this._message = message;
        this._code = 403;
    }

    get getMessage(): string {
        return this._message;
    }

    get getCode(): number {
        return this._code;
    }
}