import userModel from "../models/user.model.js";
import { passwordValidator, emailValidator, usernameValidator } from "../utils/validators.js";
import bcrypt from "bcryptjs";

export const updateUserPassword = async (req, res, next) => {
    try{
        const {oldPassword, newPassword, confirmPassword} = req.body;

        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(400).json({ message: 'Some fields are missing' });
        }

        const user = await userModel.findById(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) return res.status(400).json({message: 'Old password is incorrect'});

        const passwordCheck = passwordValidator(newPassword, confirmPassword);
        if(passwordCheck != true) return res.status(passwordCheck.status).json({message: passwordCheck.message});
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();
        res.status(200).json({message: 'Password Updated successfully'});
    } catch(error){
        next(error);
    }
}

export const updateUserEmail = async (req, res, next) => {
    try{
        const {newEmail} = req.body;

        if (!newEmail) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await userModel.findById(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found'});

        const emailCheck = await emailValidator(newEmail);
        if(emailCheck != true) return res.status(emailCheck.status).json({message: emailCheck.message});

        user.email = newEmail;

        await user.save();
        res.status(200).json({message: 'Email Updated successfully'});
    } catch(error){
        next(error);
    }
}

export const updateUsername = async (req, res, next) => {
    try{
        const {newUsername} = req.body;

        if (!newUsername) {
            return res.status(400).json({ message: 'New username is required' });
        }

        const user = await userModel.findById(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found'});

        const usernameCheck = await usernameValidator(newUsername);
        if(usernameCheck != true) return res.status(usernameCheck.status).json({message: usernameCheck.message});

        user.username = newUsername;

        await user.save();
        res.status(200).json({message: 'Username Updated successfully'});
    } catch(error){
        next(error);
    }
}

export const deleteAccount = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.params.id);

        if(!user){
            const error = new Error('No user found');
            error.statusCode = 404;
            throw error;
        }

        await user.remove();

        res.status(200).json({message:'User deleted successfully'});
    } catch(error){
        next(error);
    }
}