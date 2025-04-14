import { Schema, SchemaDefinition, model, Types } from "mongoose";

const CategorySchema = new Schema<SchemaDefinition>(
    {
        _id: Types.ObjectId,
        name: {
            type: String,
            required: true,
        }
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const CategoryModel = model("CategoryID", CategorySchema, );
export default CategoryModel;