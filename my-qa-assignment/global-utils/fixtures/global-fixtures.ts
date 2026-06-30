// import { test as base } from "@playwright/test";
// import { UiInstanceRegistry } from "../../ui/utils/instance-registry/instance.registry";

// interface CustomFixtures {
//     uiRegistry: UiInstanceRegistry;
// }

// export const test = base.extend<CustomFixtures>({
//     uiRegistry: async ({ page }, use) => {
//         const registry = new UiInstanceRegistry(page);
//         await use(registry);
//     },
// });

// export { expect } from "@playwright/test";
