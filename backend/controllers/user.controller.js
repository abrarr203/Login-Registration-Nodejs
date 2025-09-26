import userModel from "../models/user.model.js";

import { birthDateValidator } from "../utils/validators.js";

export const getUsers = async (req, res, next) => {
    try{
        const users = await userModel.find().select('fullName username description profilePic');

        res.status(200).json({
            success:true,
            data: users,
        });

    } catch(error){
        next(error);
    }
}

export const getUserDetails = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.params.id);

        if(!user){
            const error = new Error('No user found');
            error.statusCode = 404;
            throw error;
        };

        res.status(200).json({
            success: true,
            data: user,
        });

    } catch(error){
        next(error);
    }
}


export const updateUserProfile = async (req, res, next) => {
    try{
        const {fullName, profilePic, description, birthDate} = req.body;

        const user = await userModel.findById(req.params.id);

        if(!user) return res.status(404).json({message: 'User not found'});

        if(fullName) user.fullName = fullName;

        if(profilePic) user.profilePic = profilePic;

        if(description) user.description = description;

        if(birthDate){
            const birthDateCheck = birthDateValidator(birthDate);

            if(birthDateCheck != true) return res.status(birthDateCheck.status).json({message: birthDateCheck.message});

            user.birthDate = birthDate;
        }

        await user.save();

        res.status(200).json({message: 'User profile Updated successfully'});
    } catch(error){
        next(error);
    }
}