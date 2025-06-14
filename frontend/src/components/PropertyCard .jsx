import { Heart, Home, MapPin, Star } from "lucide-react";
import { useState } from "react";

const PropertyCard = ({ listing, onSelect }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <div className="h-48 bg-gray-300 flex items-center justify-center">
          {listing.images && listing.images.length > 0 ? (
            <img
              src={`https://glane-assignment.onrender.com/uploads/${listing.images[0]}`}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Home className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 ${
              isLiked ? "fill-rose-500 text-rose-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-4" onClick={() => onSelect(listing)}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 truncate">
            {listing.title}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {listing.rating || "New"}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {listing.location.city}, {listing.location.country}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{listing.propertyType}</span>
          <div className="text-right">
            <span className="font-bold text-gray-900">₹{listing.price}</span>
            <span className="text-sm text-gray-600"> / night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
