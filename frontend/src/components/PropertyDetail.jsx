import { Home, MapPin } from "lucide-react";
import { useState } from "react";

const PropertyDetail = ({ listing, onBack, onBook }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const days = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );
    return days * listing.price;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsBooking(true);

    try {
      await onBook({
        listingId: listing._id,
        checkIn,
        checkOut,
        guests,
      });
      alert("Booking successful!");
    } catch (error) {
      alert("Booking failed: " + error.message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
      >
        ← Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="h-96 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
              {listing?.images && listing?.images?.length > 0 ? (
                <img
                  src={`http://localhost:5000/uploads/${listing?.images[0]}`}
                  alt={listing.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Home className="h-24 w-24 text-gray-400" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {listing?.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>
                {listing?.location?.address}, {listing?.location?.city},{" "}
                {listing?.location?.country}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
              <span>{listing?.maxGuests} guests</span>
              <span>•</span>
              <span>{listing?.bedrooms} bedrooms</span>
              <span>•</span>
              <span>{listing?.bathrooms} bathrooms</span>
            </div>
          </div>

          <div className="border-t pt-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">About this place</h2>
            <p className="text-gray-600 leading-relaxed">
              {listing?.description}
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
              {listing?.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  <span className="mr-2">✓</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold">₹{listing?.price}</span>
              <span className="text-gray-600">per night</span>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {[...Array(listing?.maxGuests)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} guest{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {checkIn && checkOut && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Total</span>
                    <span className="font-bold">${calculateTotal()}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isBooking}
                className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBooking ? "Booking..." : "Reserve"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyDetail;
