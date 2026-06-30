import { Locator, Page } from "@playwright/test";

export class CartLocators {

    readonly title: Locator;

    constructor(page: Page) {
        this.title = page.getByTestId("primary-header");
    }
}
