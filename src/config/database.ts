import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/stock",
      {
        serverSelectionTimeoutMS: 20000,
      }
    );
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Error al conectarse con MongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
