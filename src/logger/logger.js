import winston from "winston";

/**
 * Represents a Winston transport for logging messages to a file.
 * @name FileTransport
 * @memberof module:winston.transport
 */
const logger = winston.createLogger({
    level: "info", // Level log (info, warn, error, debug, etc.)
    format: winston.format.combine(
        winston.format.timestamp(), // Add time's point to each message
        winston.format.json(), // Select the message output format
    ),
    transports: [
        // Adding log transport to a file
        new winston.transports.File({ filename: "./app.log" }),
    ],
});

export default logger;
