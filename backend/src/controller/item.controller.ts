import CategoryModel from "../models/CategoryModel";
import ItemModel from "../models/ItemModel";
import { Request, Response } from "express";

export class ItemController {
    private static categories = CategoryModel;
    private static items = ItemModel;

    static getItems = async (req: Request, res: Response) => {
        try {
            const data = await this.items.find().populate('category')
            res.send(data);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };
}