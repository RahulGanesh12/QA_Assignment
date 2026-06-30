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

    async clickOnCartIcon() {
        await this.productPageLocators.cartIcon.click();
    }

    async sort() {
        await this.productPageLocators.sort.click();
        await this.productPageLocators.sort.selectOption("Price (low to high)");
        let values = await this.productPageLocators.price.allTextContents();
        const firstPrice = parseFloat(values[0].replace("$", ""));

        const isLowest = values.every(price =>
            firstPrice <= parseFloat(price.replace("$", ""))
        );
        await expect(isLowest).toBeTruthy();

    }

}
