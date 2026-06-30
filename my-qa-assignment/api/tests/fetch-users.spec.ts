import { expect, test } from "../../global-utils/fixtures/global-fixtures";
import { endpoints } from "../utils/endpoints/endpoints.mapper";
import { Backend_Urls } from "../utils/base-urls/base-urls.manager";
import { Backend_Auth } from "../utils/backend-auth/backend-auth.manager";

let headers: Record<string, string>;
let response: any;

test.beforeAll(async ({ apiRegistry }) => {
    headers = apiRegistry.apiHeadersInstance.json({ "x-api-key": Backend_Auth.APITOKEN });
    apiRegistry.apiClientInstance.init({ baseUrl: Backend_Urls.BASEURL, headers });
});

test("Fetch users and validate", async ({ apiRegistry }) => {
    response = await apiRegistry.apiClientInstance.get(endpoints.fetchUsers);

    const body: any = await apiRegistry.apiAssertionsInstance.convertApiResponseToJson(response);

    let len = await body.data.length;

    expect(await apiRegistry.apiAssertionsInstance.statusCodeIs(response, 200)).toBeTruthy();
    for (let index = 0; index < len; index++) {
        expect(await apiRegistry.apiAssertionsInstance.keyExistsInResponseBody(response, await body.data[index].id)).toBeTruthy();
        expect(await apiRegistry.apiAssertionsInstance.keyExistsInResponseBody(response, await body.data[index].email)).toBeTruthy();
        expect(await apiRegistry.apiAssertionsInstance.keyExistsInResponseBody(response, await body.data[index].first_name)).toBeTruthy();
        expect(await apiRegistry.apiAssertionsInstance.keyExistsInResponseBody(response, await body.data[index].last_name)).toBeTruthy();
    }
});
