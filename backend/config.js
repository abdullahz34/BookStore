import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const PORT = process.env.PORT;
export const mongoDBURL = process.env.MONGODB_URL;