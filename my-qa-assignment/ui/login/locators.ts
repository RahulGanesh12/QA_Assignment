import { Page } from "@playwright/test";

export class LoginLocators {

    readonly username;
    readonly password;
    readonly loginButton;
    readonly errorWrapper;

    constructor(page: Page) {
        this.username = page.getByTestId("username");
        this.password = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-button");
        this.errorWrapper = page.getByTestId("error");
    }
}