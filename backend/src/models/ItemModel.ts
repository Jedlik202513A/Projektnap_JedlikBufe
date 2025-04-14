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
        category_id: {
            type: Schema.Types.ObjectId,
            ref: 'category_id',
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