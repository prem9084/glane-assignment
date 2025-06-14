import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./db/db.js";
import authRoute from "./routes/AuthRoute.js";
import bookingRoute from "./routes/BookingsRoute.js";
import listingRoute from "./routes/ListingRoute.js";
import path from "path";
const app = express();

dotenv.config();

connectDb();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
const __dirname = path.resolve(); // Needed for ES Modules
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// routes

app.use("/api/auth", authRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/listning", listingRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
