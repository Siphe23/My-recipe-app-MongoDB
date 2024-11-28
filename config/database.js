import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb conneted: ${connection.connection.host}`);
    } catch (error) {
        console.error('error:${error}')

    }
};
export default connectDB;