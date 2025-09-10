import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import googleAuthRouter from "./googleAuth.route.js";
import sittingsRouter from "./sittings.route.js";

export const setupRoutes = (app) =>{
    const apiBase = '/api/v1';

    app.use(`${apiBase}/auth`, authRouter);
    app.use(`${apiBase}/users`, userRouter);
    app.use(`${apiBase}/auth/google/`, googleAuthRouter);
    app.use(`${apiBase}/sittings`, sittingsRouter);
};