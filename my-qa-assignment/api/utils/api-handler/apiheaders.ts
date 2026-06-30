export type HeaderValue = string;
export type HeaderMap = Record<string, HeaderValue>;

export class ApiHeaders {
    json(customHeaders?: HeaderMap): HeaderMap {
        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...(customHeaders ?? {}),
        };
    }

    multipart(customHeaders?: HeaderMap): HeaderMap {
        return {
            "Content-Type": "multipart/form-data",
            ...(customHeaders ?? {}),
        };
    }
}
