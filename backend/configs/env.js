import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || "development"}.local`});

export const {
    PORT, SERVER_URL, NODE_ENV,
    DB_URI, ACCESS_JWT_SECRET, REFRESH_JWT_SECRET
} = process.env;