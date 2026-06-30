import dotenv from 'dotenv';
import path from 'path';

const environment = (process.env.TEST_ENV || 'qa').toLowerCase();

dotenv.config({
    path: path.resolve(__dirname, `ui-credentials.${environment}.env`)
});

type UserCredentials = {
    VALIDUSERNAME: string;
    LOCKEDUSERNAME: string;
    PROBLEMUSER: string;
    PASSWORD: string
};

export const UiCredentials: UserCredentials = {
    VALIDUSERNAME: process.env.VALIDUSERNAME || '',
    LOCKEDUSERNAME: process.env.LOCKEDUSERNAME || '',
    PROBLEMUSER: process.env.PROBLEMUSER || '',
    PASSWORD: process.env.PASSWORD || '',
};