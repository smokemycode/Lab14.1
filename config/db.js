import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected: ${conn.connection.name}`);
	} catch (err) {
		console.error("MongoDB connection error:", err.message);
		process.exit(1);
	}
};

// Share the connection for use in other modules
export default connectDB;
