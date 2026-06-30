import { test as base } from "@playwright/test";
import { APIInstanceRegistry } from "../../api/utils/instance-registry/instance.registry";

interface CustomFixtures {
    apiRegistry: APIInstanceRegistry;
}

let sharedApiRegistry: APIInstanceRegistry | undefined;

export const test = base.extend<CustomFixtures>({
    apiRegistry: async ({ request }, use) => {
        if (!sharedApiRegistry) {
            sharedApiRegistry = new APIInstanceRegistry();
        }

        await sharedApiRegistry.apiClientInstance.setRequestContext(request);
        await use(sharedApiRegistry);
    },
});

export { expect } from "@playwright/test";
