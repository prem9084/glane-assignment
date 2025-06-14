import BookingScheema from "../models/BookingScheema.js";
import listingSchema from "../models/listingSchema.js";

export const doBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut, guests } = req.body;

    const listing = await listingSchema.findById(listingId);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    // Calculate total price
    const days = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = days * listing.price;

    const booking = await BookingScheema.create({
      listing: listingId,
      guest: req.user._id,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: parseInt(guests),
      totalPrice,
    });

    await booking.populate(["listing", "guest"]);

    res.status(201).json({ success: true, message: "Booked", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await BookingScheema.find({ guest: req.user._id })
      .populate("listing", "title images location price")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get booking

export const hostBooking = async (req, res) => {
  try {
    const listings = await listingSchema.find({ host: req.user._id });
    const listingIds = listings.map((listing) => listing._id);

    const bookings = await BookingScheema.find({ listing: { $in: listingIds } })
      .populate("listing", "title images")
      .populate("guest", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
