import ItemModel from "../models/item-model.js";
import asyncHandler from 'express-async-handler';
import UserModel from "../models/user-model.js";
class ItemService{
        async checkExist(id, res){
            const item = await ItemModel.findById(id);
           if(!item) {
               res.status(400);
               throw new Error('Item not found');
           }
           return item;
        }
        checkExistByAuthUser = asyncHandler(async(id, user, res)=>{
            const item = await this.checkExist(id, res);

            // check for user
            if(!user){
                res.status(401);
                throw new Error('User not found');
            }

            // make sure the logged user matches those one who updating item:
            if(item.user.toString() !== user._id.toString()){
                res.status(401);
                throw new Error('User not authorized');
            }
            return item;
        });

}
export default new ItemService();