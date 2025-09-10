
import userModel from '../models/user.model.js';
import { decodeToken, verifyToken } from '../utils/jwtUtils.js';

const authenticateToken = async (req, res, next) => {
    // // In header there is {Authorization: Bearer <Token>} here we check if there is a token or not then
    // // split it so we can verify if the token we have is the same of what user says. 
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: 'No token provided',
        })
    }

    try{
        verifyToken(token);

        const decoded = decodeToken(token);

        const user = await userModel.findById(decoded.userId);

        if(!user){
            return res.status(401).json({
                message: 'Unauthorized',
            });
        };

        req.user = user;

        next()
    } catch(error){
        return res.status(401).json({message: "Unauthorized", error: error.message});
    }
};

export default authenticateToken;