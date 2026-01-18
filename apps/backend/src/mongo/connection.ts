import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    console.debug("Connecting to database: ", process.env.MONGO_URI);
    const connection = await mongoose.connect(process.env.MONGO_URI || "");
    console.log("💾 Database connected successfully");
    return connection;
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};
