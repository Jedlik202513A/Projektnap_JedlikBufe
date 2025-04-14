import { Schema, SchemaDefinition, model } from "mongoose";
import CategorySchema from "./CategoryModel.js";


const ItemSchema = new Schema<SchemaDefinition>(
    {
        _id: Number,
        name: {
            type: String,
            required: true,
        },
        category: {
            type: CategorySchema,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
)

const ItemModel = model("ItemID", ItemSchema, );
export default ItemModel;