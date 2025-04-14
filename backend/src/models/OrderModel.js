const { Schema, model, Types } = require('mongoose');

const OrderSideSchema = new Schema(
	{
		orderID: { type: Types.ObjectId, required: true, unique: true },
		sumPrice: { type: Number, required: true },
		status: { type: String, required: true },
		items: { type: [ItemSchema], required: true },
		orderNumber: { type: Number, required: true },
	},
	{
		versionKey: false,
		id: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const OrderModel = model('OrderID', OrderSideSchema);
export default OrderModel;
