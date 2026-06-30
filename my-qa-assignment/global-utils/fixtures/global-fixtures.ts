import { test as base } from "@playwright/test";
import { APIInstanceRegistry } from "../../api/utils/instance-registry/instance.registry";

interface CustomFixtures {
    apiRegistry: APIInstanceRegistry;
}

export const test = base.extend<CustomFixtures>({
    apiRegistry: async ({ page }, use) => {
        await use(new APIInstanceRegistry());
    },
});

export { expect } from "@playwright/test";
