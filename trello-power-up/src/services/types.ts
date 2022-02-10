export type ApiResponseError = {
    readonly state: 'error';
    readonly error: string;
};

export type ApiResponseSuccess<T> = { readonly state: 'success'; readonly data: T };

export type ApiResponse<T = unknown> = ApiResponseSuccess<T> | ApiResponseError;
