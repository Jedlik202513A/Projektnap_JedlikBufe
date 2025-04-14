import { Schema, SchemaDefinition, model,Types } from "mongoose";
import OrderSideSchema from "./OrderModel";
// https://mongoosejs.com/docs/typescript.html
// https://mongoosejs.com/docs/validation.html
// https://transform.tools/json-to-mongoose

// ************************************************
const UserSchema = new Schema<SchemaDefinition>(
    {
        _id: Types.ObjectId,
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        orders: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
        role: {
            type: Number,
            required: true,
        }
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// ************************************************
const UserModel = model("UserID", UserSchema, 'users');
export default UserModel;

