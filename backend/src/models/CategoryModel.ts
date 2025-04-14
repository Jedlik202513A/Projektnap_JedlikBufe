import { Schema, SchemaDefinition, model } from "mongoose";

const CategorySchema = new Schema<SchemaDefinition>(
    {
        _id: Number,
        name: {
            type: String,
            required: true,
        }
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const CategoryModel = model("CategoryID", CategorySchema, );
export default CategoryModel;