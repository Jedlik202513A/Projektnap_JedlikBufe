const { Schema, model, Types } = require('mongoose');

const ItemSchema =
	new Schema() <
	SchemaDefinition >
	({
		_id: Types.ObjectId,
		name: {
			type: String,
			required: true,
			trim: true,
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
	{
		versionKey: false,
		id: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	});

const ItemModel = model('ItemID', ItemSchema);
export default ItemModel;
