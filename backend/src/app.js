try {
	const express = require('express');
	const cors = require('cors');
	const app = express();

	app.use(cors());
	app.use(express.json());
	module.exports = app;
} catch (error) {
	console.error('Error initializing app:', error);
	throw error; // Rethrow the error to stop the server from starting
}
