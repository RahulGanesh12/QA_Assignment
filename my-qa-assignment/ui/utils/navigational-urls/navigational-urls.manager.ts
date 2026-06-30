import dotenv from 'dotenv';
import path from 'path';

const environment = (process.env.TEST_ENV || 'qa').toLowerCase();

dotenv.config({
    path: path.resolve(__dirname, `navigational-urls.${environment}.env`)
});

type Base_URLS = {
    QA_BASE_URL: string,
    DEV_BASE_URL: string,
    STAGING_BASE_URL: string
}

export const Navigational_Urls: Base_URLS = {
    QA_BASE_URL: process.env.QA_BASE_URL!,
    DEV_BASE_URL: process.env.DEV_BASE_URL!,
    STAGING_BASE_URL: process.env.STAGING_BASE_URL!
};