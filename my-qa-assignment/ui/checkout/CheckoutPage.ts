import { expect, Page } from "@playwright/test";
import { CheckoutLocators } from "./locators";

export class CheckoutPage {

    private readonly checkoutLocators: CheckoutLocators;

    constructor(page: Page) {
        this.checkoutLocators = new CheckoutLocators(page);
    }

    async enterCheckoutInfo({ firstName, lastName, postalCode }: { firstName: string; lastName: string; postalCode: string }) {
        await this.checkoutLocators.firstName.fill(firstName);
        await this.checkoutLocators.lastName.fill(lastName);
        await this.checkoutLocators.postalCode.fill(postalCode);
        await this.checkoutLocators.continue.click();
    }

    async clickFinish() {
        await this.checkoutLocators.finish.click();
    }

    async validateCheckoutSuccess({ successMessage }: { successMessage: string }) {
        await expect(this.checkoutLocators.success).toHaveText(successMessage);
    }
}
