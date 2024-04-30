import v11Router from "./api/v1.1/index.js";
import v12Router from "./api/v1.2/index.js";
import authRouter from "./api/auth.router.js";
import docsRouter from "./api/docs.router.js";
/**
 * Class representing the main application router.
 */
class AppRouter {
    /**
     * Create an instance of AppRouter.
     * @param {Object} app - The Express application object.
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * Initialize the routes for the application.
     */
    init() {
        this.app.get("/", (_req, res) => {
            res.send("API Running");
        });
        this.app.use("/api/v1.1", v11Router);
        this.app.use("/api/v1.2", v12Router);
        this.app.use("/api/auth", authRouter);
        this.app.use("/api/docs", docsRouter);
    }
}

export default AppRouter;
