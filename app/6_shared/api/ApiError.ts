export class ApiError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = 'ApiError';
    }
}