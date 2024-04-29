import mongoose from "mongoose";
import "dotenv/config";

import logger from "../config/logger.js";

/**
 * Function to connect to the database.
 * @returns {Promise<void>}
 */
async function connectToDB() {
    try {
        const uri = process.env.MONGODB_TEST_URI || `${process.env.DB_URI}/${process.env.DB_NAME}`;
        const connection = await mongoose.connect(uri);
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error(`Unable to connect to the MongoDB database: ${error.message}`);
    }
}

/**
 * Function to disconnect from the database.
 * @returns {Promise<void>}
 */
async function disconnectFromDB() {
    await mongoose.disconnect();
    logger.info("Disconnected from MongoDB");
}


export { connectToDB, disconnectFromDB };