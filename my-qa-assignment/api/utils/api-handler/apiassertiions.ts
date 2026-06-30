type ResponseLike = {
    json?: () => Promise<unknown>;
    text?: () => Promise<string>;
};

export async function convertApiResponseToJson(response: unknown): Promise<unknown> {
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

export function traverseJsonByPath(json: unknown, path: string): unknown {
    if (!path?.trim()) {
        return json;
    }

    let current = json;

    for (const segment of normalizeJsonPath(path)) {
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

export async function keyExistsInResponseBody(response: unknown, path: string): Promise<boolean> {
    const jsonResponse = await convertApiResponseToJson(response);
    return traverseJsonByPath(jsonResponse, path) !== undefined;
}

export async function valueExistsForKeyInResponseBody(response: unknown, path: string, expectedValue?: unknown): Promise<boolean> {
    const jsonResponse = await convertApiResponseToJson(response);
    const value = traverseJsonByPath(jsonResponse, path);

    return expectedValue === undefined ? value !== undefined : value === expectedValue;
}

function normalizeJsonPath(path: string): string[] {
    return path
        .replace(/\[("([^"]+)"|'([^']+)'|([^\[\].]+))\]/g, ".$2$3$4")
        .replace(/^\./, "")
        .split(".")
        .filter(Boolean);
}
