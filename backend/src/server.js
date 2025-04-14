const app = require('./app');
const mongoose = require('mongoose');

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
mongoose
	.connect(
		'mongodb+srv://jedlikuser:jedlikuser@jedlikproject.aa7atkk.mongodb.net/'
	)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB:', err);
	});
