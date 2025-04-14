import mongoose, { Types } from 'mongoose';
import { Request, Response } from 'express';
import OrderModel from '../models/OrderModel';
import ItemModel from 'models/ItemModel';
import { log } from 'console';

interface Order {
	orderID: Types.ObjectId;
	sumPrice: number;
	status: string;
	items: Types.ObjectId;
	orderNumber: number;
}

export class OrderController {
	private static order = OrderModel;	

	public static getAll = async (req: Request, res: Response) => {
		try {
			const data = await this.order.find().populate('items').lean();
			res.send(data)
		} catch(error){
			res.status(400).send({ message: error.message });

		}
	}

	public static newOrder = async (req: Request, res: Response) => {
		try {
			const items = req.body;
			log(items)
			if (!items) {
				throw new Error('Order is required');
			}
			let price: number = 0;
			items.forEach((i: any) => {
				price+=i.price
			});
			const newOrder = { 
				sumPrice: price,
				status: 'In progress',
				items: [...items],
				orderNumber: items.length+1
			}
			this.order.insertMany([newOrder]);
			res.send();
		} catch (error) {
			res.status(400).send({ message: error.message });
		}
	};

	public static updateOrder = async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
            const body = req.body;
            const updatedDoc = await this.order.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate("Item", "-_id");
            if (updatedDoc) {
                res.send(updatedDoc);
            } else {
                res.status(404).send({ message: `Document with id ${id} not found!` });
            }
		} catch(error){
			res.status(400).send({ message: error.message });

		}
}
}
