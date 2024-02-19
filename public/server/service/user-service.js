import UserModel from "../models/user-model.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import asyncHandler from 'express-async-handler';
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import 'dotenv/config';
class UserService{
    registration = asyncHandler(async(name, email, password)=>{
        const userExists = await UserModel.findOne({email});
        if(userExists){
            throw new Error(`User with email ${email} already exists`);
        }
        // Hash password:
        const salt = await bcrypt.genSalt(4);
        const hashPassword = await bcrypt.hash(password, salt);
        /*const activationLink = uuidv4();*/

        let user = await UserModel.create({
            name,
            email,
            password: hashPassword
        });

       /* await mailService.sendActivationMail(email, process.env.API_URL +`/api/activate/${activationLink}`);*/

        if(!user){
            return null;
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...userDto,
            ...tokens
        }

    });
    authentication = asyncHandler(async(email, password)=> {
        const userExists = await UserModel.findOne({email});
        if(!userExists || !await bcrypt.compare(password, userExists.password)){
           return null;
        }
        const userDto = new UserDto(userExists);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...userDto,
            ...tokens
        }
    });
}

export default new UserService();