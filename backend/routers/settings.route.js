import { Router } from "express";
import { deleteAccount, updateUserEmail, updateUsername, updateUserPassword } from "../controllers/settings.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const settingsRouter = Router();

settingsRouter.put('/change-password/:id', authenticateToken, updateUserPassword);
settingsRouter.put('/change-email/:id', authenticateToken, updateUserEmail);
settingsRouter.put('/change-username/:id', authenticateToken, updateUsername);
settingsRouter.delete('/delete-account/:id', authenticateToken, deleteAccount);


export default settingsRouter;