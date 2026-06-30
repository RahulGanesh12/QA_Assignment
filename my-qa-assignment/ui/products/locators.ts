import { Page } from "@playwright/test";

export class ProductLocators {

    readonly title;

    constructor(page: Page) {
        this.title = page.getByTestId("primary-header");
    }
}