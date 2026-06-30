import { Page } from "@playwright/test";
import { LoginPage } from "../../login/LoginPage";
import { ProductsPage } from "../../products/ProductsPage";
import { CartPage } from "../../cart/CartPage";
import { CheckoutPage } from "../../checkout/CheckoutPage";

export class UiInstanceRegistry {
    private readonly page: Page;

    private loginPageInstance?: LoginPage;
    private productsPageInstance?: ProductsPage;
    private cartPageInstance?: CartPage;
    private checkoutPageInstance?: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
    }

    get loginPage(): LoginPage {
        if (!this.loginPageInstance) {
            this.loginPageInstance = new LoginPage(this.page);
        }

        return this.loginPageInstance;
    }

    get productsPage(): ProductsPage {
        if (!this.productsPageInstance) {
            this.productsPageInstance = new ProductsPage(this.page);
        }

        return this.productsPageInstance;
    }

    get cartPage(): CartPage {
        if (!this.cartPageInstance) {
            this.cartPageInstance = new CartPage(this.page);
        }

        return this.cartPageInstance;
    }

    get checkoutPage(): CheckoutPage {
        if (!this.checkoutPageInstance) {
            this.checkoutPageInstance = new CheckoutPage(this.page);
        }

        return this.checkoutPageInstance;
    }
}
