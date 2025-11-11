import { Link } from "react-router-dom";
import { getImageFallback } from "../lib/api";

export default function ProductCard({ product }) {
  const { _id, productName, imageUrl, price, originCountry, rating, availableQuantity } = product;
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <figure className="aspect-video overflow-hidden">
        <img src={getImageFallback(imageUrl)} alt={productName} className="h-full w-full object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-lg">{productName}</h3>
        <div className="grid grid-cols-2 gap-1 text-sm opacity-80">
          <span>Price: ${price}</span>
          <span>Country: {originCountry}</span>
          <span>Rating: {rating}</span>
          <span>Available: {availableQuantity}</span>
        </div>
        <div className="card-actions justify-end">
          <Link to={`/products/${_id}`} className="btn btn-primary btn-sm">See Details</Link>
        </div>
      </div>
    </div>
  );
}


