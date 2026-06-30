import { Navigational_Urls } from "../navigational-urls/navigational-urls.manager";
import endpointPaths from "./endpoints.json";

const buildUrl = (path: string): string => {
    const baseUrl = Navigational_Urls.BASE_URL.replace(/\/$/, "");
    const normalizedPath = path.trim().startsWith("/") ? path.trim() : `/${path.trim()}`;
    return `${baseUrl}${normalizedPath}`;
};

export const endpoints = {
    productsPage: buildUrl(endpointPaths.productsPage),
    cartsPage: buildUrl(endpointPaths.cartsPage),
    checkoutPage: buildUrl(endpointPaths.checkoutPage),
    checkoutOverviewPage: buildUrl(endpointPaths.checkoutOverviewPage),
    checkoutCompletePage: buildUrl(endpointPaths.checkoutCompletePage),
};
