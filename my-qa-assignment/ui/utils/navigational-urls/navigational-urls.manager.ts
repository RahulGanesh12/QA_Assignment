import dotenv from 'dotenv';
import path from 'path';

const environment = (process.env.TEST_ENV || 'qa').toLowerCase();

dotenv.config({
    path: path.resolve(__dirname, `navigational-urls.${environment}.env`)
});

type Base_URLS = {
    BASE_URL: string,
}

export const Navigational_Urls: Base_URLS = {
    BASE_URL: process.env.BASE_URL!,
};