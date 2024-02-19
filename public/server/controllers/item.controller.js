import asyncHandler from 'express-async-handler';
import ItemModel from '../models/item-model.js';
import ItemDto from "../dtos/item-dto.js";
import ItemService from "../service/item-service.js";
class ItemController{

    // @desc Get items
    // @route GET/api/items
    // @access Private
    getAll  = asyncHandler(async (req, res)=>{
        const items = await ItemModel.find({user: req.user._id});
        res.status(200).json(items);
    });

    // @desc Get item
    // @route GET/api/items/:id
    // @access Private
    get = asyncHandler(async(req, res) => {
        const item = await ItemService.checkExistByAuthUser(req.params.id, req.user._id, res);
        const itemDto = new ItemDto(item);
        res.status(200).json(itemDto);
    });

    // @desc Set item
    // @route POST/api/items
    // @access Private
    set = asyncHandler(async(req, res) => {
        if(!req.body.title || !req.body.text) {
            return res.status(400).json({message: 'Please add value'});
        }
        const item = await ItemModel.create({
            title: req.body.title,
            text: req.body.text,
            user: req.user._id
        });
        const itemDto = new ItemDto(item);
        res.status(201).json(itemDto);
    });

    // @desc Update item
    // @route PUT/api/items/:id
    // @access Private
    update = asyncHandler(async(req, res) => {
        await ItemService.checkExistByAuthUser(req.params.id, req.user._id, res);

        const updated = await ItemModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true} // means create object if it does not exist
        );

        const itemDto = new ItemDto(updated);
        res.status(200).json(itemDto);
    });

    // @desc Remove item
    // @route DELETE/api/items/:id
    // @access Private
    remove = asyncHandler(async(req, res) => {
        const item = await ItemService.checkExistByAuthUser(req.params.id, req.user._id, res);

        await ItemModel.deleteOne({_id: item._id});
        const itemDto = new ItemDto(item);
        res.status(200).json(itemDto);
    });

}
export default new ItemController();