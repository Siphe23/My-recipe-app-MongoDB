import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from the environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Log a success message without exposing sensitive info
        console.log('MongoDB connected successfully.');
    } catch (error) {
        // Detailed error message to help debug issues
        console.error('MongoDB connection error:', error.message || error);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
};

export default connectDB;

