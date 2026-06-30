import { Page } from "@playwright/test";
import { PayloadBuilder } from "../../builders/payload.builder";

export class APIInstanceRegistry {

    private payloadBuilder?: PayloadBuilder;

    get payloadBuilders(): PayloadBuilder {
        if (!this.payloadBuilder) {
            this.payloadBuilder = new PayloadBuilder();
        }

        return this.payloadBuilder;
    }
}
