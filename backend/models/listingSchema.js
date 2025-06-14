import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  price: { type: Number, required: true },
  images: [String],
  amenities: [String],
  propertyType: { type: String, required: true },
  maxGuests: { type: Number, required: true },
  bedrooms: Number,
  bathrooms: Number,
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  availability: [
    {
      date: Date,
      available: { type: Boolean, default: true },
    },
  ],
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number,
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Listing", listingSchema);
