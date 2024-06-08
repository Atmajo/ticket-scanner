import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    return "Database connected successfully";
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
