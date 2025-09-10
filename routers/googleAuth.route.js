import { Router } from "express";
import { googleCallback, googleLogin } from "../controllers/googleAuth.controller.js";

const googleAuthRouter = Router();

googleAuthRouter.get('/', googleLogin);
googleAuthRouter.get('/callback', googleCallback);

export default googleAuthRouter;