import { APIRequestContext } from "@playwright/test";
import { HeaderMap } from "./apiheaders";

export class ApiClient {
    private requestContext?: APIRequestContext;
    private baseUrl?: string;
    private headers?: HeaderMap;

    init({ baseUrl, headers }: { baseUrl?: string; headers?: HeaderMap }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        return this;
    }

    async setRequestContext(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    async get(url: string, options?: { headers?: HeaderMap; params?: Record<string, string | number> }) {
        return this.request("GET", url, options);
    }

    async post(url: string, payload?: unknown, options?: { headers?: HeaderMap }) {
        return this.request("POST", url, { ...options, payload });
    }

    async put(url: string, payload?: unknown, options?: { headers?: HeaderMap }) {
        return this.request("PUT", url, { ...options, payload });
    }

    async delete(url: string, options?: { headers?: HeaderMap }) {
        return this.request("DELETE", url, options);
    }

    private async request(method: string, url: string, options?: { headers?: HeaderMap; params?: Record<string, string | number>; payload?: unknown }) {
        const fullUrl = this.resolveUrl(url, options?.params);
        const headers = {
            ...(this.headers ?? {}),
            ...(options?.headers ?? {}),
        };

        if (!this.requestContext) {
            throw new Error("API request context is not initialized. Call setRequestContext() first.");
        }

        const data = options?.payload === undefined
            ? undefined
            : typeof options.payload === "string"
                ? options.payload
                : JSON.stringify(options.payload);

        return this.requestContext.fetch(fullUrl, {
            method,
            headers,
            data,
            ignoreHTTPSErrors: true,
        });
    }

    private resolveUrl(url: string, params?: Record<string, string | number>) {
        const hasProtocol = /^(https?:)?\/\//i.test(url);

        if (hasProtocol || !this.baseUrl) {
            return this.appendParams(url, params);
        }

        const normalizedBaseUrl = this.baseUrl.replace(/\/$/, "");
        const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
        return this.appendParams(`${normalizedBaseUrl}${normalizedUrl}`, params);
    }

    private appendParams(url: string, params?: Record<string, string | number>) {
        if (!params) {
            return url;
        }

        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            query.append(key, String(value));
        });

        const separator = url.includes("?") ? "&" : "?";
        return `${url}${query.toString() ? `${separator}${query.toString()}` : ""}`;
    }
}
