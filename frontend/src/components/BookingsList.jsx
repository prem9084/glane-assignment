import { Calendar, Users } from "lucide-react";

const BookingsList = ({ bookings }) => {
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  if (safeBookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
        <p className="mt-1 text-sm text-gray-500">
          You haven't made any bookings yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

      <div className="space-y-4">
        {safeBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {booking.listing?.title || "Untitled Listing"}
                </h3>
                <p className="text-gray-600 mt-1">
                  {booking.listing?.location?.city || "Unknown City"},{" "}
                  {booking.listing?.location?.country || "Unknown Country"}
                </p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {booking.checkIn
                      ? new Date(booking.checkIn).toLocaleDateString()
                      : "N/A"}{" "}
                    -{" "}
                    {booking.checkOut
                      ? new Date(booking.checkOut).toLocaleDateString()
                      : "N/A"}
                  </span>
                  <Users className="h-4 w-4 ml-4 mr-1" />
                  <span>{booking.guests || 0} guests</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  ₹{booking.totalPrice || 0}
                </div>
                <div
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status || "unknown"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsList;
