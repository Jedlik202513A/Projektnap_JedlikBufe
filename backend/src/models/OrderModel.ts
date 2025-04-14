import { Schema, SchemaDefinition, model, Types } from "mongoose";
import ItemSchema from "./ItemModel";

const OrderSideSchema = new Schema<SchemaDefinition>(
  {
    orderID: { type: Types.ObjectId, required: true, unique: true },
    sumPrice: { type: Number, required: true },
    status: { type: String, required: true },
    items: { 
      type: Schema.Types.ObjectId,
            ref: 'Item'    
    ,required: true },
    orderNumber: { type: Number, required: true },
  },
  {
    versionKey: false,
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OrderModel = model("OrderID", OrderSideSchema);
export default OrderModel;
