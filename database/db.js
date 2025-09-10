import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../configs/env.js';

// if database is not defined yet
if(!DB_URI){
    throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}

const databaseConnection = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to database successfully in ${NODE_ENV} mode.`);
    } catch(error){
        console.log('Error connecting to database: ', error);
    }
};

export default databaseConnection;