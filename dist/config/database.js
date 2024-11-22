"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || "mongodb://localhost:27017/stock", {
            serverSelectionTimeoutMS: 20000,
        });
        console.log("MongoDB conectado");
    }
    catch (err) {
        console.error("Error al conectarse con MongoDB", err);
        process.exit(1);
    }
};
exports.default = connectDB;
