import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserModel from "../models/user-model.js";

const protect = asyncHandler(async(req, res, next)=> {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1];

            //verify token - get payload:
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            // get user from the token:
            req.user = await UserModel.findById(decoded.id).select('-password'); //without passwordhash

            next();
        }catch (e) {
            console.log(e);
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export {protect}