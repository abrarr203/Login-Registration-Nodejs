import jwt from 'jsonwebtoken';
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from '../configs/env.js';

export const generateAccessToken = (userId) => {
    return jwt.sign({userId}, ACCESS_JWT_SECRET, {expiresIn: '24h'});
}

export const generateRefreshToken = (userId) => {
    return jwt.sign({userId}, REFRESH_JWT_SECRET);
}

export const verifyToken = (token) => {
    return jwt.verify(token, ACCESS_JWT_SECRET);
}

export const decodeToken = (token) => {
    return jwt.decode(token, ACCESS_JWT_SECRET)
}