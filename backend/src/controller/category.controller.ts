import { Request, Response } from "express";
import CategoryModel from "../models/CategoryModel";

export class CategoryController {
    private static categories = CategoryModel;

    static getCategories = async (req: Request, res: Response) => {
        try {
            const data = await this.categories.find()
            res.send(data);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };
}
