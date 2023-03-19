export interface IAuthState {
    token: null | string;
    status: null | number;
}

export interface ISessionResponse {
    token: string;
    status: number;
}

export interface ISessionErrorResponse {
    status: 0;
    error: {
        "fields": {
            [key: string]: string;
        },
        "code": string
    }
}
