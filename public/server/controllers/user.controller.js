import userService from "../service/user-service.js";
import asyncHandler from 'express-async-handler';
import UserModel from "../models/user-model.js";
import ItemModel from "../models/item-model.js";

class UserController {
    // @desc Register User
    // @route POST/api/users/registration
    // @access Public
     register = asyncHandler(async(req, res, next) => {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please add all fields" });
        }else if(password.length < 6){
            return res.status(400).json({ message: "Password less than 6 characters" });
        }

        const userExists = await UserModel.findOne({email});

        if(userExists){
             return res.status(400).json({ message: `User with email ${email} already exists`});
        }

        const UserData = await userService.registration(name, email, password);


        if(UserData){
            res.status(201).json(UserData);
        } else {
            res.status(400).json({ message: `Error while creating User with email ${email}`});
        }

/*        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true, // чтобы куку нельзя было изменять/получать внутри браузера
           // secure: false, // for https usage
        });*/
    });

    // @desc Authenticate User
    // @route POST/api/users/login
    // @access Public
    login = asyncHandler(async(req, res, next)=>{
        const {email, password} = req.body;
        if(email === undefined) return res.status(400).json({ message: "Please add a email" });

        const UserData = await userService.authentication(email, password);

        if(!UserData){
            return res.status(400).json({ message: `Invalid email or password`});
        }

        res.status(200).json(UserData);
    });

    // @desc Get User Data
    // @route GET/api/users/login
    // @access Private
    get = asyncHandler(async(req, res, next)=>{
        const {name, email} = await UserModel.findById(req.user._id);

        res.status(200).json({
            id: req.user._id,
            name,
            email
        });
    });
    async logout(req, res, next){
        try{

        }catch (e) {
            console.log(e);
        }
    }
    async activate(req, res, next){
        try{

        }catch (e) {
            console.log(e);
        }
    }
    async refresh(req, res, next){
        try{

        }catch (e) {
            console.log(e);
        }
    }

    // @desc Get Users
    // @route GET/api/users
    // @access Public
    getAll = asyncHandler(async(req, res, next) => {
        const items = await UserModel.find();
        res.status(200).json(items);
    });
}
export default new UserController();