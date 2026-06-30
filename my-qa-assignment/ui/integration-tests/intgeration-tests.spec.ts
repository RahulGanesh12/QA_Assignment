import { BrowserContext, Page, test } from "@playwright/test";
import { UiCredentials } from "../utils/credentials/ui-credentials.manager";
import { Navigational_Urls } from "../utils/navigational-urls/navigational-urls.manager";
import { UiInstanceRegistry } from "../utils/instance-registry/instance.registry";

let context: BrowserContext;
let page: Page;
let uiRegistry: UiInstanceRegistry;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    uiRegistry = new UiInstanceRegistry(page);
});

test.beforeEach(async () => {
    await page.goto(Navigational_Urls.BASE_URL);
    await page.waitForLoadState("networkidle");
});

test("Login, add products, checkout successfully", async () => {

    await uiRegistry.loginPage.verifyLogin({
        userName: UiCredentials.VALIDUSERNAME,
        password: UiCredentials.PASSWORD,
    });

    await uiRegistry.loginPage.validateSuccessfulLogin({ title: "Swag Labs" });

    await uiRegistry.productsPage.addProductToCart();
    await uiRegistry.productsPage.clickOnCartIcon();

    await uiRegistry.cartPage.clickCheckOut();

    await uiRegistry.checkoutPage.enterCheckoutInfo({
        firstName: "Test",
        lastName: "User",
        postalCode: "12345",
    });

    await uiRegistry.checkoutPage.clickFinish();
    await uiRegistry.checkoutPage.validateCheckoutSuccess({ successMessage: "Thank you for your order!" });
    await uiRegistry.checkoutPage.clickBackToProducts();
    await uiRegistry.productsPage.sort();
});

test.afterAll(async () => {
    await context.close();
});
