import { Locator, Page } from "@playwright/test";

export class CartLocators {

    readonly checkout: Locator;

    constructor(page: Page) {
        this.checkout = page.getByTestId("checkout");
    }
}
