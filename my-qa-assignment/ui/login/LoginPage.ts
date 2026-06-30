import { expect, Page } from "@playwright/test";
import { LoginLocators } from "./locators";
import { ProductLocators } from "../products/locators";

export class LoginPage {

    private readonly loginLocators: LoginLocators;
    private readonly productPageLocators: ProductLocators;

    constructor(page: Page) {
        this.loginLocators = new LoginLocators(page);
        this.productPageLocators = new ProductLocators(page);
    }

    async verifyLogin({ userName, password }: { userName: string, password: string }) {
        await this.loginLocators.username.fill(userName);
        await this.loginLocators.password.fill(password);
        await this.loginLocators.loginButton.click();
    }

    async validateSuccessfulLogin({ title }: { title: string }) {
        await expect(this.productPageLocators.title.locator(".app_logo")).toHaveText(title);
    }

    async validateUnsuccessfullLogin({ title }: { title: string }) {
        await expect(this.productPageLocators.title).not.toBeVisible();
        await expect(this.loginLocators.errorWrapper).toBeVisible();
        await expect(this.loginLocators.errorWrapper).toHaveText("Epic sadface: Sorry, this user has been locked out.");
    }
}