import app from "./app.js";
import logger from "./config/logger.js";
import { disconnectFromDB } from "./database/db.js";

const port = app.get("port");

// Server settings
const server = app.listen(port, () => {
    try {
        console.log(`Server started on port ${port}`);
        logger.info(`Server started on port ${port}`);
    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
    }
});

// Handle SIGTERM signal
process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
        disconnectFromDB();
        server.close();
    }
});

export default server;
