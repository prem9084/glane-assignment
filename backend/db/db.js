import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connection ${db.connection.host}`);
  } catch (error) {
    console.log("Error in Db connection", error);
  }
};
