import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../lib/api";
import ProductCard from "../../components/ProductCard";
import SkeletonCard from "../../components/SkeletonCard";
import { Helmet } from "react-helmet-async";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Filter states
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [country, setCountry] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/products`);
      setAllProducts(data || []);
      setFilteredProducts(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allProducts];

    // Search filter
    if (query.trim()) {
      result = result.filter(p =>
        p.productName.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter
    if (category) {
      result = result.filter(p =>
        p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Price filter
    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    // Rating filter
    if (minRating) {
      result = result.filter(p => p.rating >= Number(minRating));
    }

    // Country filter
    if (country.trim()) {
      result = result.filter(p =>
        p.originCountry.toLowerCase().includes(country.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "date-desc") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "date-asc") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [query, category, minPrice, maxPrice, minRating, country, sortBy, allProducts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setCountry("");
    setSortBy("");
  };

  return (
    <div className="space-y-6">
      <Helmet><title>All Products • Import Export Hub</title></Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">All Products</h2>
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered w-full sm:w-80"
            placeholder="Search by product name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Filters & Sorting</h3>
            <button onClick={clearFilters} className="btn btn-ghost btn-xs">Clear All</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {/* Category Filter */}
            <select
              className="select select-bordered select-sm w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Textiles">Textiles</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Machinery">Machinery</option>
              <option value="Other">Other</option>
            </select>

            {/* Price Range */}
            <input
              type="number"
              className="input input-bordered input-sm w-full"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              className="input input-bordered input-sm w-full"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            {/* Rating Filter */}
            <select
              className="select select-bordered select-sm w-full"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>

            {/* Country Filter */}
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            {/* Sort By */}
            <select
              className="select select-bordered select-sm w-full"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm opacity-70">
        Showing {currentProducts.length} of {filteredProducts.length} products
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {currentProducts.map(p => <ProductCard key={p._id} product={p} />)}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-10 opacity-70">
              No products found. Try adjusting your filters.
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            <button
              className="join-item btn btn-sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`join-item btn btn-sm ${currentPage === i + 1 ? 'btn-active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="join-item btn btn-sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



