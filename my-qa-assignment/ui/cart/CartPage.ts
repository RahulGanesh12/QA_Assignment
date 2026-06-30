import { expect, Page } from "@playwright/test";
import { CartLocators } from "./locators";

export class CartPage {

    private readonly cartLocators: CartLocators;

    constructor(page: Page) {
        this.cartLocators = new CartLocators(page);
    }

    async clickCheckOut() {
        await this.cartLocators.checkout.click();
    }
}
