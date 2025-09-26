import {Router} from 'express';
import { getUserDetails, getUsers, updateUserProfile } from '../controllers/user.controller.js';
import authenticateToken from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/profile/:id', authenticateToken, getUserDetails);
userRouter.put('/profile/:id', authenticateToken,updateUserProfile);

export default userRouter;