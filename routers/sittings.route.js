import { Router } from "express";
import { deleteAccount, updateUserEmail, updateUsername, updateUserPassword } from "../controllers/sittings.controller.js";
import authenticateToken from "../middlewares/auth.middleware.js";

const sittingsRouter = Router();

sittingsRouter.put('/change-password/:id', authenticateToken, updateUserPassword);
sittingsRouter.put('/change-email/:id', authenticateToken, updateUserEmail);
sittingsRouter.put('/change-username/:id', authenticateToken, updateUsername);
sittingsRouter.delete('/delete-account/:id', authenticateToken, deleteAccount);


export default sittingsRouter;