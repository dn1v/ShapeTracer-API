// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URL);


// mongoose.set('strictQuery', false)
const mongoose = require('mongoose');

// Get the MongoDB URL from the environment variables
 const mongodbUrl = process.env.MONGODB_URL;


// Connect to the MongoDB database using the URL
mongoose.connect(mongodbUrl);

// Get the connection object
const connection = mongoose.connection;

// Log a message when the connection is successfully established
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Log an error message if there was an error connecting to the database
connection.on('error', (error) => {
  console.error('Error connecting to MongoDB database: ', error);
});
