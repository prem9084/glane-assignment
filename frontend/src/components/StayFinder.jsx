import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import AuthPage from "./AuthPage/AuthPage";
import PropertyDetail from "./PropertyDetail";
import BookingsList from "./BookingsList";
import HostDashboard from "./HostDasgboard";
import AddListing from "./AddListing";
import PropertyCard from "./PropertyCard ";
import { api } from "./api/api.js";
import Header from "./Header.jsx";
import { Home } from "lucide-react";

const StayFinder = () => {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [hostListings, setHostListings] = useState([]);
  const [hostBookings, setHostBookings] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadListings();
  }, []);

  useEffect(() => {
    if (user) {
      loadBookings();
      if (user.isHost) {
        loadHostData();
      }
    }
  }, [user]);

  const loadListings = async (searchFilters = {}) => {
    setIsLoading(true);
    try {
      const data = await api.getListings(searchFilters);
      setListings(data);
    } catch (error) {
      console.error("Failed to load listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBookings = async () => {
    try {
      const data = await api.getBookings();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Failed to load bookings:", error);
    }
  };

  const loadHostData = async () => {
    try {
      const [listingsData, bookingsData] = await Promise.all([
        api.getHostListings(),
        api.getHostBookings(),
      ]);
      setHostListings(listingsData);
      setHostBookings(bookingsData);
    } catch (error) {
      console.error("Failed to load host data:", error);
    }
  };

  const handleLogin = async (credentials) => {
    const response = await api.login(credentials);
    login(response.user, response.token);
    navigate("/"); // redirect to home
  };

  const handleRegister = async (userData) => {
    const response = await api.register(userData);
    login(response.user, response.token);
    navigate("/"); // redirect to home
  };

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    loadListings(searchFilters);
  };

  const handleBooking = async (bookingData) => {
    const booking = await api.createBooking(bookingData);
    await loadBookings();
    return booking;
  };

  const handleCreateListing = async (listingData) => {
    const listing = await api.createListing(listingData);
    await loadHostData();
    navigate("/host-dashboard");
    return listing;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading properties...</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Find your perfect stay
                    </h1>
                    <p className="text-gray-600">
                      Discover amazing places to stay around the world
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listings.map((listing) => (
                      <PropertyCard
                        key={listing._id}
                        listing={listing}
                        onSelect={(listing) => {
                          setSelectedListing(listing);
                          navigate("/detail");
                        }}
                      />
                    ))}
                  </div>

                  {listings.length === 0 && (
                    <div className="text-center py-12">
                      <Home className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No properties found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search criteria.
                      </p>
                    </div>
                  )}
                </>
              )}
            </main>
          }
        />

        <Route
          path="/login"
          element={
            <AuthPage
              type="login"
              onSubmit={handleLogin}
              onToggle={() => navigate("/register")}
            />
          }
        />

        <Route
          path="/register"
          element={
            <AuthPage
              type="register"
              onSubmit={handleRegister}
              onToggle={() => navigate("/login")}
            />
          }
        />

        <Route
          path="/detail"
          element={
            <PropertyDetail
              listing={selectedListing}
              onBack={() => navigate("/")}
              onBook={handleBooking}
            />
          }
        />

        <Route
          path="/bookings"
          element={<BookingsList bookings={bookings} />}
        />

        <Route
          path="/host-dashboard"
          element={
            <HostDashboard listings={hostListings} bookings={hostBookings} />
          }
        />

        <Route
          path="/add-listing"
          element={
            <AddListing
              onSubmit={handleCreateListing}
              onCancel={() => navigate("/host-dashboard")}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default StayFinder;
