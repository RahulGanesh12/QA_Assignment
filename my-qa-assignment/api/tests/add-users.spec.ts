import { expect, test } from "../../global-utils/fixtures/global-fixtures";
import { Backend_Auth } from "../utils/backend-auth/backend-auth.manager";
import { endpoints } from "../utils/endpoints/endpoints.mapper";
import { Backend_Urls } from "../utils/base-urls/base-urls.manager";

let headers: Record<string, string>;
let payload: any;
let response: any;
let responseBody: any;


test.beforeAll(async ({ apiRegistry }) => {
    headers = apiRegistry.apiHeadersInstance.json({ "x-api-key": Backend_Auth.APITOKEN });
    apiRegistry.apiClientInstance.init({ baseUrl: Backend_Urls.BASEURL, headers: headers });
});

test("Add a new user and validate", async ({ apiRegistry }) => {
    payload = apiRegistry.payloadBuilders.createUserPayload("morpheus", "leader");
    response = await apiRegistry.apiClientInstance.post(endpoints.createUser, payload);
    const body = await apiRegistry.apiAssertionsInstance.convertApiResponseToJson(response);

    expect(await apiRegistry.apiAssertionsInstance.statusCodeIs(response, 201)).toBeTruthy();
    expect(await apiRegistry.apiAssertionsInstance.keyExistsInResponseBody(response, "id")).toBeTruthy();
    expect(await apiRegistry.apiAssertionsInstance.keyExistsInResponseBody(response, "createdAt")).toBeTruthy();

    expect(await apiRegistry.apiAssertionsInstance.valueExistsForKeyInResponseBody(response, "name", "morpheus")).toBeTruthy();
    expect(await apiRegistry.apiAssertionsInstance.valueExistsForKeyInResponseBody(response, "job", "leader")).toBeTruthy();

});