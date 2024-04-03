export class MaxFetchReachedError extends Error {
    private readonly _message: string;
    private readonly _errorCode: number;

    constructor(message:string) {
        super(message);
        this._message = message;
        this._errorCode = 429;
    }

    get message(): string {
        return this._message;
    }

    get errorCode(): number {
        return this._errorCode;
    }
}