import { CreateUserPayload } from "./payload.schema";

export class PayloadBuilder {
    createUserPayload(name: string, job: string): CreateUserPayload {
        let payload: CreateUserPayload = {
            name: name,
            job: job
        }
        return payload;
    }
}