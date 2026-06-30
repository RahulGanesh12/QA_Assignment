import { Backend_Urls } from "../base-urls/base-urls.manager";
import endpointPaths from "./endpoints.json";

const buildUrl = (path: string): string => {
    const baseUrl = Backend_Urls.BASEURL.replace(/\/$/, "");
    const normalizedPath = path.trim().startsWith("/") ? path.trim() : `/${path.trim()}`;
    return `${baseUrl}${normalizedPath}`;
};

export const endpoints = {
    fetchUsers: buildUrl(endpointPaths.fetchUsers),
    createUser: buildUrl(endpointPaths.createUser),
};
