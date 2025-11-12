import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../lib/api";
import ProductCard from "../../components/ProductCard";
import { Helmet } from "react-helmet-async";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/products`);
      setProducts(data || []);
    } finally {
      setLoading(false);
    }
  };

  const search = async () => {
    if (!query.trim()) return fetchAll();
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/products/search/${encodeURIComponent(query.trim())}`);
      setProducts(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="space-y-6">
      <Helmet><title>All Products • Import Export Hub</title></Helmet>
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
          <button onClick={search} className="btn btn-primary">Search</button>
        </div>
      </div>
      {loading ? (
        <div className="min-h-[200px] grid place-items-center"><span className="loading loading-spinner loading-lg" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
      {!loading && products.length === 0 && <div className="opacity-70">No products found.</div>}
    </div>
  );
}


