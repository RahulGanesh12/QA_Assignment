import { Locator, Page } from "@playwright/test";

export class CheckoutLocators {

    readonly title: Locator;

    constructor(page: Page) {
        this.title = page.getByTestId("primary-header");
    }
}
