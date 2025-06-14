import { Calendar, CreditCard, Home } from "lucide-react";

const HostDashboard = ({ listings, bookings }) => {
  // Ensure bookings is always an array
  const safeBookings = Array.isArray(bookings) ? bookings : [];
  const totalRevenue = safeBookings.reduce(
    (sum, booking) => sum + (booking.totalPrice || 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Host Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Listings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-rose-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Listings
              </h3>
              <p className="text-2xl font-bold text-rose-600">
                {Array.isArray(listings) ? listings.length : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Bookings
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {safeBookings.length}
              </p>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Revenue
              </h3>
              <p className="text-2xl font-bold text-green-600">
                ${totalRevenue}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your Listings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Listings
          </h3>
          <div className="space-y-3">
            {Array.isArray(listings) && listings.length > 0 ? (
              listings.map((listing) => (
                <div
                  key={listing._id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {listing.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {listing.location?.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${listing.price}/night</p>
                    <p className="text-xs text-gray-500">
                      {listing.propertyType}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No listings available.</p>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Bookings
          </h3>
          <div className="space-y-3">
            {safeBookings.length > 0 ? (
              safeBookings.slice(0, 5).map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {booking.listing?.title || "Unknown Listing"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {booking.guest?.name || "Unknown Guest"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${booking.totalPrice}</p>
                    <p
                      className={`text-xs ${
                        booking.status === "confirmed"
                          ? "text-green-600"
                          : booking.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
