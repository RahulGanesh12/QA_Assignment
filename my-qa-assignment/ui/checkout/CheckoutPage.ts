import { expect, Page } from "@playwright/test";
import { CheckoutLocators } from "./locators";

export class CheckoutPage {

    private readonly checkoutLocators: CheckoutLocators;

    constructor(page: Page) {
        this.checkoutLocators = new CheckoutLocators(page);
    }

    async verifyCheckoutPage() {
        await this.checkoutLocators.title.waitFor();
    }

    async validateCheckoutPage({ title }: { title: string }) {
        await expect(this.checkoutLocators.title).toHaveText(title);
    }
}
