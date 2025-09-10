import userModel from "../models/user.model.js";

export const passwordValidator = (password, confirmPassword) => {
    const regex = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
    if(!regex){
        return {
            message:'Password must be at least 8 characters, include uppercase, lowercase, number, and special character',
            status: 400};
    }
    if(password != confirmPassword){
        return {message: 'Passwords do not match', status: 400};
    }
    return true;
}

export const emailValidator = async (email) => {
    const regex = /^\S+@\S+\.\S+$/.test(email);

    if(!regex){
        return {message: 'Invalid email format', status: 400};
    }

    const existingEmail = await userModel.findOne({email});

    if(existingEmail){
        return {message: 'Email already exists', status: 409};
    }

    return true;
}

export const usernameValidator = async (username) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9._]{4,9}$/.test(username);

    if(!regex){
        return {
            message: `Username ${username} must be 5-10 characters, start with a letter, and contain only letters, numbers, . or _`,
            status: 400};
    }
    
    const existingUsername = await userModel.findOne({username});
    
    if(existingUsername){
        return {message: `Username ${username} already exists`, status: 400};
    }

    return true;
}

export const birthDateValidator = (date) => {
    const today = new Date();
    if(date > today) return {message: 'Birth date cannot be in the future', status: 400};

    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    
    if(monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)){
        age--;
    }

    if(age < 18 || age > 120){
        return {message: 'User age must be between 18 and 120 years', status:400};
    }

    return true;
}