import * as fs from "fs";
import * as path from "path";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../../login/LoginPage";
import { UiCredentials } from "../credentials/ui-credentials.manager";
import { Navigational_Urls } from "../navigational-urls/navigational-urls.manager";

const storageStatePath = path.resolve(__dirname, "../login-cookies/login-cookies.json");

export const ensureAuthenticatedSession = async ({ browser }: { browser: Browser }) => {
    const storageStateExists = fs.existsSync(storageStatePath);

    if (storageStateExists) {
        const fileContent = fs.readFileSync(storageStatePath, "utf8");
        const parsedContent = JSON.parse(fileContent);

        const hasValidCookies = parsedContent.cookies?.some((cookie: { expires?: number }) => {
            if (!cookie.expires) {
                return false;
            }

            return cookie.expires > Math.floor(Date.now() / 1000);
        });

        if (hasValidCookies) {
            return { storageStatePath };
        }
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(Navigational_Urls.BASE_URL);
    await page.waitForLoadState("networkidle");

    const loginPage = new LoginPage(page);
    await loginPage.verifyLogin({
        userName: UiCredentials.VALIDUSERNAME,
        password: UiCredentials.PASSWORD,
    });
    await loginPage.validateSuccessfulLogin({ title: "Swag Labs" });
    await loginPage.storeCookies({ path: storageStatePath });

    await context.close();

    return { storageStatePath };
};
