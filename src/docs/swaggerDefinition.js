import "dotenv/config";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "",
        description: "Welcome to the documentation for  API.",
        version: "1.0.0",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}/api`,
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "Endpoints related to user authentication.",
        },
        {
            name: "User",
            description: "Endpoints related to user management.",
        },
        {
            name: "Post",
            description: "Endpoints related to product categories.",
        },
        {
            name: "Comment",
            description: "Endpoints related to product categories.",
        },
    ],
};

export default swaggerDefinition;
