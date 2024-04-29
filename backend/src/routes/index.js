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

    }
}

export default AppRouter;
