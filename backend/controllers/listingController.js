import listingSchema from "../models/listingSchema.js";

// for adding

export const addListing = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      city,
      country,
      price,
      propertyType,
      maxGuests,
      bedrooms,
      bathrooms,
      amenities,
    } = req.body;

    const images = req.files ? req.files.map((file) => file.filename) : [];

    const listing = await listingSchema.create({
      title,
      description,
      location: { address, city, country },
      price: parseInt(price),
      images,
      amenities: Array.isArray(amenities) ? amenities : amenities.split(","),
      propertyType,
      maxGuests: parseInt(maxGuests),
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      host: req.user._id,
    });

    await listing.populate("host", "name avatar");

    res.status(201).json({ success: true, message: "listing added", listing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// for updating

export const updateListing = async (req, res) => {
  try {
    const listing = await listingSchema.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updatedListing = await listingSchema
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("host", "name avatar");

    res.json({ success: true, message: "Updated", updatedListing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// search listing

export const searchFilter = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, propertyType, guests, title } =
      req.query;

    const filter = {};

    // ✅ Priority: If title is provided, search by title only
    if (title && title.trim() !== "") {
      filter.title = { $regex: title, $options: "i" };
    }
    // ✅ If title not provided but location is, search by location
    else if (location && location.trim() !== "") {
      filter.$or = [
        { "location.city": { $regex: location, $options: "i" } },
        { "location.country": { $regex: location, $options: "i" } },
        { "location.address": { $regex: location, $options: "i" } },
      ];
    }

    // ✅ Optional filters
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (guests) {
      filter.maxGuests = { $gte: parseInt(guests) };
    }

    console.log("Applied Filter:", filter);

    const listings = await listingSchema
      .find(filter)
      .populate("host", "name avatar")
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    console.error("Search Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// get listing by id

export const getListing = async (req, res) => {
  try {
    const listing = await listingSchema
      .findById(req.params.id)
      .populate("host", "name avatar phone")
      .populate("reviews.user", "name avatar");

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all list

export const getAllListing = async (req, res) => {
  try {
    const listings = await listingSchema
      .find({ host: req.user._id })
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete

export const deleteListing = async (req, res) => {
  try {
    const listing = await listingSchema.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
