import express from 'express';
import mongoose from 'mongoose';
import IController from './interfaces/interfaces';
import { oneSideModel, manySideModel } from './models/models';
import morgan from 'morgan';
import cors from 'cors';
import { AuthRoutes } from 'routes/auth.routes';

export default class App {
	public app: express.Application;

	constructor(controllers: IController[]) {
		// Create express application:
		this.app = express();
		// Connect to the database:
		this.connectToTheDatabase();
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
	}

	public listen(): void {
		this.app.listen(5000, () => {
			console.log('App listening on the port 5000');
		});
	}

	private connectToTheDatabase() {
		mongoose.set('strictQuery', true);
		mongoose
			.connect(
				'mongodb+srv://jedlikuser:jedlikuser@jedlikproject.aa7atkk.mongodb.net/'
			)
			.catch(() =>
				console.log('Unable to connect to the server. Please start MongoDB.')
			);

		mongoose.connection.on('error', (error) => {
			console.log(`Mongoose error message: ${error.message}`);
		});
		mongoose.connection.on('connected', () => {
			console.log('Connected to MongoDB server.');
			this.listen();
		});

		// init models for populate
		oneSideModel.init();
		manySideModel.init();
	}
}
