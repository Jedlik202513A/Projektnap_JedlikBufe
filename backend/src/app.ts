import express from 'express';
import mongoose from 'mongoose';
import IController from './interfaces/interfaces';
// import { oneSideModel, manySideModel } from './models/models';
import morgan from 'morgan';
import cors from 'cors';

export default class App {
	public app: express.Application;

	constructor(controllers: IController[]) {
		// Create express application:
		this.app = express();
		// Parse incoming requests with JSON payloads:
		this.app.use(express.json());
		// Enabled CORS:
		this.app.use(cors());
		// morgan logger:
		this.app.use(morgan('dev'));
		
		// Add controllers to the app:
		controllers.forEach((controller) => {
			this.app.use('/', controller.router);
		});
		
		this.listen();		
	}

	public listen(): void {
		this.app.listen(5000, () => {			
			console.log('App listening on the port 5000');
		});
	}
}
