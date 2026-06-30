import dotenv from 'dotenv';
import path from 'path';

const environment = (process.env.TEST_ENV || 'qa').toLowerCase();

dotenv.config({
    path: path.resolve(__dirname, `backend-auth.${environment}.env`)
});

type Tokens = {
    APITOKEN: string,
}

export const Backend_Auth: Tokens = {
    APITOKEN: process.env.APITOKEN!,
};