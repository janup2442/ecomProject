import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
// MongoDB connection URL


// Connection options
const options = {
    dbName:'kanpurClassic',
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Establish the connection
const connectDb = mongoose.connect(process.env.URL_DB, options)
    .then(() =>{
        console.log('Connected to MongoDB');
    })
    .catch((error) =>{
        console.error('Error connecting to MongoDB:', error.message);

        // Handle specific error conditions
        if (error.name === 'MongoNetworkError') {
            console.error('Network error occurred. Check your MongoDB server.');
        } else if (error.name === 'MongooseServerSelectionError') {
            console.error('Server selection error. Ensure'
                + ' MongoDB is running and accessible.');
        } else {
            // Handle other types of errors
            console.error('An unexpected error occurred:', error);
        }
    });

// Handling connection event

// Gracefully close the connection when the application exits
process.on('SIGINT', () =>{
    mongoose.connection.close(() =>{
        console.log('Mongoose connection is disconnected'
         + ' due to application termination');
        process.exit(0);
    });
});

export default connectDb
