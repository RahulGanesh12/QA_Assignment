import { PayloadBuilder } from "../../builders/payload.builder";
import { ApiHeaders } from "../api-handler/apiheaders";
import { ApiClient } from "../api-handler/apiclient";
import { ApiAssertions } from "../api-handler/apiassertiions"

export class APIInstanceRegistry {

    private payloadBuilder?: PayloadBuilder;
    private apiHeaders?: ApiHeaders;
    private apiClient?: ApiClient;
    private apiAssertions?: ApiAssertions;

    get payloadBuilders(): PayloadBuilder {
        if (!this.payloadBuilder) {
            this.payloadBuilder = new PayloadBuilder();
        }

        return this.payloadBuilder;
    }

    get apiHeadersInstance(): ApiHeaders {
        if (!this.apiHeaders) {
            this.apiHeaders = new ApiHeaders();
        }
        return this.apiHeaders;
    }

    get apiClientInstance(): ApiClient {
        if (!this.apiClient) {
            this.apiClient = new ApiClient();
        }

        return this.apiClient;
    }

    get apiAssertionsInstance(): ApiAssertions {
        if (!this.apiAssertions) {
            this.apiAssertions = new ApiAssertions();
        }
        return this.apiAssertions;
    }
}
