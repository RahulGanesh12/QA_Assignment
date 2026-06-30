import { Page } from "@playwright/test";

export class ProductLocators {

    readonly title;
    readonly backPack;
    readonly bikeLight;
    readonly cartIcon;

    constructor(page: Page) {
        this.title = page.getByTestId("primary-header");
        this.backPack = page.getByTestId("add-to-cart-sauce-labs-backpack");
        this.bikeLight = page.getByTestId("add-to-cart-sauce-labs-bike-light");
        this.cartIcon = page.getByTestId("shopping-cart-link");
    }
}