# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\tests\fetch-users.spec.ts >> Fetch users and validate
- Location: my-qa-assignment\api\tests\fetch-users.spec.ts:14:5

# Error details

```
TypeError: path.replace is not a function
```

# Test source

```ts
  14  |                 return JSON.parse(response);
  15  |             } catch {
  16  |                 return response;
  17  |             }
  18  |         }
  19  | 
  20  |         if (typeof response === "object") {
  21  |             const res = response as ResponseLike;
  22  | 
  23  |             if (typeof res.json === "function") {
  24  |                 return res.json();
  25  |             }
  26  | 
  27  |             if (typeof res.text === "function") {
  28  |                 const text = await res.text();
  29  |                 try {
  30  |                     return JSON.parse(text);
  31  |                 } catch {
  32  |                     return text;
  33  |                 }
  34  |             }
  35  |         }
  36  | 
  37  |         return response;
  38  |     }
  39  | 
  40  |     traverseJsonByPath(json: unknown, path: string): unknown {
  41  |         let current = json;
  42  | 
  43  |         for (const segment of this.normalizeJsonPath(path)) {
  44  |             if (current == null) {
  45  |                 return undefined;
  46  |             }
  47  | 
  48  |             if (Array.isArray(current)) {
  49  |                 const index = Number(segment);
  50  |                 if (!Number.isInteger(index) || index < 0 || index >= current.length) {
  51  |                     return undefined;
  52  |                 }
  53  |                 current = current[index];
  54  |                 continue;
  55  |             }
  56  | 
  57  |             if (typeof current !== "object" || !Object.prototype.hasOwnProperty.call(current, segment)) {
  58  |                 return undefined;
  59  |             }
  60  | 
  61  |             current = (current as Record<string, unknown>)[segment];
  62  |         }
  63  | 
  64  |         return current;
  65  |     }
  66  | 
  67  |     async keyExistsInResponseBody(response: unknown, path: string): Promise<boolean> {
  68  |         const jsonResponse = await this.convertApiResponseToJson(response);
  69  |         return this.traverseJsonByPath(jsonResponse, path) !== undefined;
  70  |     }
  71  | 
  72  |     async valueExistsForKeyInResponseBody(response: unknown, path: string, expectedValue?: unknown): Promise<boolean> {
  73  |         const jsonResponse = await this.convertApiResponseToJson(response);
  74  |         const value = this.traverseJsonByPath(jsonResponse, path);
  75  | 
  76  |         return expectedValue === undefined ? value !== undefined : value === expectedValue;
  77  |     }
  78  | 
  79  |     async statusCodeIs(response: unknown, expectedStatusCode: number): Promise<boolean> {
  80  |         const statusCode = this.extractStatusCode(response);
  81  |         return statusCode === expectedStatusCode;
  82  |     }
  83  | 
  84  |     private extractStatusCode(response: unknown): number | undefined {
  85  |         if (response == null) {
  86  |             return undefined;
  87  |         }
  88  | 
  89  |         if (typeof response === "object") {
  90  |             const maybeResponse = response as {
  91  |                 status?: number | (() => number);
  92  |                 statusCode?: number;
  93  |                 statusText?: string;
  94  |             };
  95  | 
  96  |             if (typeof maybeResponse.status === "number") {
  97  |                 return maybeResponse.status;
  98  |             }
  99  | 
  100 |             if (typeof maybeResponse.status === "function") {
  101 |                 return maybeResponse.status();
  102 |             }
  103 | 
  104 |             if (typeof maybeResponse.statusCode === "number") {
  105 |                 return maybeResponse.statusCode;
  106 |             }
  107 |         }
  108 | 
  109 |         return undefined;
  110 |     }
  111 | 
  112 |     private normalizeJsonPath(path: string): string[] {
  113 |         return path
> 114 |             .replace(/\[("([^"]+)"|'([^']+)'|([^\[\].]+))\]/g, ".$2$3$4")
      |              ^ TypeError: path.replace is not a function
  115 |             .replace(/^\./, "")
  116 |             .split(".")
  117 |             .filter(Boolean);
  118 |     }
  119 | }
  120 | 
```