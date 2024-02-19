import jwt from 'jsonwebtoken';
import tokenModel from '../models/token-model.js';
import 'dotenv/config';
class TokenService{
    generateTokens(payload){
/*        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30m'
        });*/
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '15d'
        });
        return {
/*            accessToken,*/
            refreshToken
        }
    }
    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({id_user: userId});
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await tokenModel.create({id_user: userId, refreshToken});
    }
}

export default new TokenService();