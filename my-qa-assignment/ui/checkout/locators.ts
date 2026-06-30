import { Locator, Page } from "@playwright/test";

export class CheckoutLocators {

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continue: Locator;
    readonly finish: Locator;
    readonly success: Locator;

    constructor(page: Page) {
        this.firstName = page.getByTestId("firstName");
        this.lastName = page.getByTestId("lastName");
        this.postalCode = page.getByTestId("postalCode");
        this.continue = page.getByTestId("continue");
        this.finish = page.getByTestId("finish");
        this.success = page.getByTestId("complete-header");
    }
}
