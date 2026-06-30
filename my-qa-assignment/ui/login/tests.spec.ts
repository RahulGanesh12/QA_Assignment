import { test } from "@playwright/test";
import { Page, BrowserContext } from "@playwright/test";
import { Navigational_Urls } from "../utils/navigational-urls/navigational-urls.manager";
import { UiCredentials } from "../utils/credentials/ui-credentials.manager";
import { UiInstanceRegistry } from "../utils/instance-registry/instance.registry";

let context: BrowserContext;
let page: Page;
let uiRegistry: UiInstanceRegistry;

test.beforeAll("Launch the browsers", async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    uiRegistry = new UiInstanceRegistry(page);
});

test.beforeEach("Navigate to the login page", async () => {
    await page.goto(Navigational_Urls.BASE_URL);
    await page.waitForLoadState('networkidle');
});

test("Login and validate", async () => {
    await uiRegistry.loginPage.verifyLogin({ userName: UiCredentials.VALIDUSERNAME, password: UiCredentials.PASSWORD });
    await uiRegistry.loginPage.validateSuccessfulLogin({ title: "Swag Labs" });
});

test("Login with invalid credentials and validate", async () => {
    await uiRegistry.loginPage.verifyLogin({ userName: UiCredentials.LOCKEDUSERNAME, password: UiCredentials.PASSWORD });
    await uiRegistry.loginPage.validateUnsuccessfullLogin({ title: "Swag Labs" });
});

test.afterAll("Close the browsers", async () => {
    await context.close();
});