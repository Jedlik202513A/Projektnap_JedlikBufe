import { Types } from 'mongoose';
import ItemModel from '../models/ItemModel';
import { Request, Response } from 'express';
import OrderModel from 'models/OrderModel';

interface Order {
	orderID: Types.ObjectId;
	sumPrice: number;
	status: string;
	items: Types.ObjectId;
	orderNumber: number;
}

export class ItemController {
	private order = OrderModel;

	newOrder = async (req: Request, res: Response) => {
		try {
			const { order } = req.body;
			if (!order) {
				throw new Error('Order is required');
			}
			this.order.insertMany([order]);
			res.send();
		} catch (error) {
			res.status(400).send({ message: error.message });
		}
	};
}
