type ResponseLike = {
    json?: () => Promise<unknown>;
    text?: () => Promise<string>;
};

export class ApiAssertions {
    async convertApiResponseToJson(response: unknown): Promise<unknown> {
        if (response == null) {
            return null;
        }

        if (typeof response === "string") {
            try {
                return JSON.parse(response);
            } catch {
                return response;
            }
        }

        if (typeof response === "object") {
            const res = response as ResponseLike;

            if (typeof res.json === "function") {
                return res.json();
            }

            if (typeof res.text === "function") {
                const text = await res.text();
                try {
                    return JSON.parse(text);
                } catch {
                    return text;
                }
            }
        }

        return response;
    }

    traverseJsonByPath(json: unknown, path: string): unknown {
        let current = json;

        for (const segment of this.normalizeJsonPath(path)) {
            if (current == null) {
                return undefined;
            }

            if (Array.isArray(current)) {
                const index = Number(segment);
                if (!Number.isInteger(index) || index < 0 || index >= current.length) {
                    return undefined;
                }
                current = current[index];
                continue;
            }

            if (typeof current !== "object" || !Object.prototype.hasOwnProperty.call(current, segment)) {
                return undefined;
            }

            current = (current as Record<string, unknown>)[segment];
        }

        return current;
    }

    async keyExistsInResponseBody(response: unknown, path: string): Promise<boolean> {
        const jsonResponse = await this.convertApiResponseToJson(response);
        return this.traverseJsonByPath(jsonResponse, path) !== undefined;
    }

    async valueExistsForKeyInResponseBody(response: unknown, path: string, expectedValue?: unknown): Promise<boolean> {
        const jsonResponse = await this.convertApiResponseToJson(response);
        const value = this.traverseJsonByPath(jsonResponse, path);

        return expectedValue === undefined ? value !== undefined : value === expectedValue;
    }

    async statusCodeIs(response: unknown, expectedStatusCode: number): Promise<boolean> {
        const statusCode = this.extractStatusCode(response);
        return statusCode === expectedStatusCode;
    }

    private extractStatusCode(response: unknown): number | undefined {
        if (response == null) {
            return undefined;
        }

        if (typeof response === "object") {
            const maybeResponse = response as {
                status?: number | (() => number);
                statusCode?: number;
                statusText?: string;
            };

            if (typeof maybeResponse.status === "number") {
                return maybeResponse.status;
            }

            if (typeof maybeResponse.status === "function") {
                return maybeResponse.status();
            }

            if (typeof maybeResponse.statusCode === "number") {
                return maybeResponse.statusCode;
            }
        }

        return undefined;
    }

    private normalizeJsonPath(path: string): string[] {
        return path
            .replace(/\[("([^"]+)"|'([^']+)'|([^\[\].]+))\]/g, ".$2$3$4")
            .replace(/^\./, "")
            .split(".")
            .filter(Boolean);
    }
}
