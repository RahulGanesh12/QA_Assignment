import { Navigational_Urls } from "../navigational-urls/navigational-urls.manager";

const buildUrl = (path: string): string => {
    const baseUrl = Navigational_Urls.BASE_URL.replace(/\/$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${normalizedPath}`;
};

export const endpoints = {
    productsPage: buildUrl("/inventory.html"),
    cartsPage: buildUrl("/cart.html"),
    checkoutPage: buildUrl("/checkout-step-one.html"),
    checkoutOverviewPage: buildUrl("/checkout-step-two.html"),
    checkoutCompletePage: buildUrl("/checkout-complete.html"),
};
