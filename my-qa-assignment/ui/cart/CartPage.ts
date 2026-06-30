import { expect, Page } from "@playwright/test";
import { CartLocators } from "./locators";

export class CartPage {

    private readonly cartLocators: CartLocators;

    constructor(page: Page) {
        this.cartLocators = new CartLocators(page);
    }

    async verifyCartPage() {
        await this.cartLocators.title.waitFor();
    }

    async validateCartPage({ title }: { title: string }) {
        await expect(this.cartLocators.title).toHaveText(title);
    }
}
