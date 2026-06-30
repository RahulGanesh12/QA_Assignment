import dotenv from 'dotenv';
import path from 'path';

const environment = (process.env.TEST_ENV || 'qa').toLowerCase();

dotenv.config({
    path: path.resolve(__dirname, `base-urls.${environment}.env`)
});

type Base_URLS = {
    BASEURL: string,
}

export const Backend_Urls: Base_URLS = {
    BASEURL: process.env.BASEURL!,
};