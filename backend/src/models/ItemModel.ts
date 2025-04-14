import { Schema, SchemaDefinition, model, Types } from "mongoose";
import CategorySchema from "./CategoryModel";

const ItemSchema = new Schema<SchemaDefinition>(
    {
        _id: Types.ObjectId,
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'categoryId',
            required: true,            
            index: true
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

const ItemModel = model("ItemID", ItemSchema, 'items');
export default ItemModel;