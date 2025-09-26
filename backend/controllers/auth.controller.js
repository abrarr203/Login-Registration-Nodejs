import bcrypt from 'bcryptjs';

import userModel from '../models/user.model.js';
import { birthDateValidator, emailValidator, passwordValidator, usernameValidator } from '../utils/validators.js';
import { generateAccessToken } from '../utils/jwtUtils.js';

export const renderSignInPage = (req, res, next) => {
    try{
        res.render('sign-in');
    }
    catch(error){
        next(error);
    }
}

export const signUp = async (req, res, next) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try{
        const {name, username, email, birthDate, password, confirmPassword} = req.body;

        if(!name || !username || !email || !birthDate || !password || !confirmPassword){
            const error = new Error('Some fields are missing');
            error.statusCode = 400;
            throw error;
        }

        // Validators

        // Check email regex and if exists
        const emailCheck = await emailValidator(email);
        if(emailCheck != true) return res.status(emailCheck.status).json({message: email.message});

        // Check username regex and if exists
        const usernameCheck = await usernameValidator(username);
        if(usernameCheck != true) return res.status(usernameCheck.status).json({message: usernameCheck.message});

        const birthDateCheck = birthDateValidator(new Date(birthDate));
        if(birthDateCheck != true) return res.status(birthDateCheck.status).json({message: birthDateCheck.message});

        const passwordCheck = passwordValidator(password, confirmPassword);
        if(passwordCheck != true) return res.status(passwordCheck.status).json({message: passwordCheck.message});

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user 
        const newUser = userModel.create([{
            name: name,
            username: username,
            email: email,
            birthDate: birthDate,
            password: hashPassword
        }]);

        // If login isn't automatic we don't need token when sign up (:  
        // const token = generateToken(user._id);

        // await session.commitTransaction();
        // session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                // token,
                newUser,
            },
        });
    } catch(error){
        // await session.abortTransaction();
        // session.endSession();
        next(error);
    }
};

export const renderSignUpPage = (req, res, next) => {
    try{
        res.render('sign-up');
    }
    catch(error){
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try{
        const {loginId, password} = req.body;
        if(!loginId || !password){
            const error = new Error('Some fields are missing');
            error.statusCode = 400;
            throw error;
        }

        // User can use both email and username to sign in
        const user = loginId.includes('@')? await userModel.findOne({email: loginId}) : await userModel.findOne({username: loginId});

        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        const accessToken = generateAccessToken(user._id);
        res.cookie('accessToken', accessToken, {httpOnly: true, secure: false}); // can not reach by js and not using https
                
        res.status(200).json({
            success: true,
            message: `User logged in successfully as ${user.role}`,
            data: {
                accessToken,
                user,
            }
        });
    } catch(error){
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    try{
        res.clearCookie('accessToken');
        res.json({message: 'Logged out successfully'});
    } catch(error){
        next(error);
    }
};