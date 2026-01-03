import { Link } from "react-router-dom";
import { getImageFallback } from "../lib/api";

export default function ProductCard({ product }) {
  const { _id, productName, imageUrl, price, originCountry, rating, availableQuantity, description } = product;

  // Truncate description to 80 characters
  const shortDesc = description
    ? description.length > 80
      ? description.substring(0, 80) + "..."
      : description
    : "No description available.";

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <figure className="aspect-video overflow-hidden">
        <img
          src={getImageFallback(imageUrl)}
          alt={productName}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </figure>
      <div className="card-body flex-1 flex flex-col">
        <h3 className="card-title text-lg line-clamp-2 min-h-[3.5rem]">{productName}</h3>
        <p className="text-sm opacity-70 flex-1 line-clamp-2">{shortDesc}</p>
        <div className="grid grid-cols-2 gap-2 text-sm mt-2">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">${price}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-warning" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{originCountry}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>Qty: {availableQuantity}</span>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link to={`/products/${_id}`} className="btn btn-primary btn-sm w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}


