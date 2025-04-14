const { Schema, model, Types } = require('mongoose');

const UserSchema =
	new Schema() <
	SchemaDefinition >
	({
		_id: Types.ObjectId,
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		orders: [OrderSideSchema],
		role: {
			type: Number,
			required: true,
		},
	},
	{
		versionKey: false,
		id: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	});

// ************************************************
const UserModel = model('UserID', UserSchema);
export default UserModel;
