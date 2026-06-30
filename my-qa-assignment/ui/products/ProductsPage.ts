import { expect, Page } from "@playwright/test";
import { ProductLocators } from "./locators";

export class ProductsPage {

    private readonly productPageLocators: ProductLocators;

    constructor(page: Page) {
        this.productPageLocators = new ProductLocators(page);
    }

    async addProductToCart() {
        await this.productPageLocators.backPack.click();
        await this.productPageLocators.bikeLight.click();
        await expect(this.productPageLocators.cartIcon).toBeVisible();
        await expect(this.productPageLocators.cartIcon).toHaveText("2");
    }

}
