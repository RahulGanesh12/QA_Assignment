import { test } from "@playwright/test";
import { Page, BrowserContext } from "@playwright/test";
import { Navigational_Urls } from "../utils/navigational-urls/navigational-urls.manager";
import { UiInstanceRegistry } from "../utils/instance-registry/instance.registry";
import { endpoints } from "../utils/endpoints/endpoints.mapper";

let context: BrowserContext;
let page: Page;
let uiRegistry: UiInstanceRegistry;

test.beforeAll("Launch the browsers", async ({ browser }) => {
    context = await browser.newContext({ storageState: 'my-qa-assignment/ui/utils/login-cookies/login-cookies.json' });
    page = await context.newPage();
    await page.goto(endpoints.productsPage);
    await page.waitForLoadState('networkidle');
    uiRegistry = new UiInstanceRegistry(page);
});

test("Add products to carts and validate", async () => {
    await uiRegistry.productsPage.addProductToCart();
});

test.afterAll("Close the browsers", async () => {
    await context.close();
});