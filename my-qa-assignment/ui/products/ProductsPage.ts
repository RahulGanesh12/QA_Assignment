import { expect, Page } from "@playwright/test";
import { ProductLocators } from "./locators";

export class ProductsPage {

    private readonly productPageLocators: ProductLocators;

    constructor(page: Page) {
        this.productPageLocators = new ProductLocators(page);
    }

    async verifyProductsPage() {
        await this.productPageLocators.title.waitFor();
    }

    async validateProductsPage({ title }: { title: string }) {
        await expect(this.productPageLocators.title).toHaveText(title);
    }
}
