import express from "express";

import { authenticateToken } from "../middleware/Auth.js";
import {
  doBooking,
  getBookings,
  hostBooking,
} from "../controllers/BookingController.js";

const router = express.Router();

router.post("/bookings", authenticateToken, doBooking);
router.get("/get-bookings", authenticateToken, getBookings);
router.get("/host/booking", authenticateToken, hostBooking);

export default router;
