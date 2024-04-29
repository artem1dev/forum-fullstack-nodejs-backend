import rateLimit from "express-rate-limit";

/**
 * Middleware that limits the number of requests from an IP address within a specified window of time.
 * @remarks
 * Requests exceeding the limit will receive a 429 status code with the message "Request limit exceeded. Try again later.".
 */
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Request limit exceeded. Try again later.",
});

export default apiLimiter;
