import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE, getImageFallback } from "../../lib/api";
import ImportModal from "../../components/ImportModal";
import { AuthContext } from "../../contex/AuthContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import ProductCard from "../../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios.get(`${API_BASE}/products/${id}`).then(res => {
      if (mounted) {
        setProduct(res.data);
        // Fetch related products (same category or random)
        fetchRelatedProducts(res.data);
      }
    }).finally(() => setLoading(false));
    return () => (mounted = false);
  }, [id]);

  const fetchRelatedProducts = async (currentProduct) => {
    try {
      const { data } = await axios.get(`${API_BASE}/products`);
      // Filter out current product and get up to 4 related items
      const related = data
        .filter(p => p._id !== currentProduct._id)
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (e) {
      console.error("Failed to fetch related products", e);
    }
  };

  const submitImport = async (qty) => {
    if (!user) return;
    try {
      const payload = {
        productId: product._id,
        importedQuantity: qty,
        userEmail: user.email,
        productName: product.productName,
        price: product.price,
        rating: product.rating,
        originCountry: product.originCountry,
        imageUrl: product.imageUrl,
      };
      await axios.post(`${API_BASE}/imports`, payload);
      toast.success("Imported successfully");
      setOpen(false);
      // Refresh product to update quantity
      const { data } = await axios.get(`${API_BASE}/products/${id}`);
      setProduct(data);
      navigate("/my-imports");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to import");
    }
  };

  if (loading) return <div className="min-h-[50vh] grid place-items-center"><span className="loading loading-spinner loading-lg" /></div>;
  if (!product) return <div>Not found</div>;

  const { productName, imageUrl, price, originCountry, rating, availableQuantity, description, category } = product;

  // Support multiple images (if imageUrl is an array, otherwise use single image)
  const images = Array.isArray(imageUrl) ? imageUrl : [imageUrl];

  return (
    <div className="space-y-8">
      <Helmet><title>{productName} • Import Export Hub</title></Helmet>

      {/* Product Header */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-base-300">
            <img
              className="w-full aspect-square object-cover"
              src={getImageFallback(images[0])}
              alt={productName}
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1, 5).map((img, i) => (
                <div key={i} className="rounded-lg overflow-hidden border border-base-300 cursor-pointer hover:opacity-80">
                  <img
                    className="w-full aspect-square object-cover"
                    src={getImageFallback(img)}
                    alt={`${productName} ${i + 2}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <div className="badge badge-primary mb-2">{category || "General"}</div>
            <h1 className="text-4xl font-bold">{productName}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="font-semibold">{rating}</span>
              <span className="text-sm opacity-70">(4.5 stars)</span>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{originCountry}</span>
            </div>
          </div>

          <div className="text-4xl font-bold text-primary">${price}</div>

          <div className="stats shadow bg-base-200">
            <div className="stat place-items-center py-4">
              <div className="stat-title">Available Quantity</div>
              <div className="stat-value text-2xl">{availableQuantity}</div>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="btn btn-primary btn-lg w-full"
            disabled={availableQuantity <= 0}
          >
            {availableQuantity > 0 ? "Import Now" : "Out of Stock"}
          </button>

          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-sm">Free shipping on orders over $500</span>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          {/* Tabs */}
          <div className="tabs tabs-boxed bg-base-200">
            <a
              className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </a>
            <a
              className={`tab ${activeTab === "specs" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("specs")}
            >
              Specifications
            </a>
            <a
              className={`tab ${activeTab === "reviews" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </a>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "overview" && (
              <div className="prose max-w-none">
                <h3>Product Description</h3>
                <p>{description || "No detailed description available for this product."}</p>
                <h4>Key Features</h4>
                <ul>
                  <li>High quality export product</li>
                  <li>Sourced from {originCountry}</li>
                  <li>Rated {rating} stars by customers</li>
                  <li>Available in bulk quantities</li>
                </ul>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <tbody>
                    <tr>
                      <th>Product Name</th>
                      <td>{productName}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>{category || "General"}</td>
                    </tr>
                    <tr>
                      <th>Origin Country</th>
                      <td>{originCountry}</td>
                    </tr>
                    <tr>
                      <th>Price per Unit</th>
                      <td>${price}</td>
                    </tr>
                    <tr>
                      <th>Available Quantity</th>
                      <td>{availableQuantity} units</td>
                    </tr>
                    <tr>
                      <th>Rating</th>
                      <td>{rating} / 5.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Reviews feature coming soon! Check back later for customer feedback.</span>
                </div>
                <div className="stats shadow w-full">
                  <div className="stat">
                    <div className="stat-title">Average Rating</div>
                    <div className="stat-value text-primary">{rating}</div>
                    <div className="stat-desc">Based on verified purchases</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Related Products</h2>
            <Link to="/products" className="btn btn-ghost btn-sm">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      )}

      <ImportModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={submitImport}
        maxQuantity={availableQuantity || 0}
      />
    </div>
  );
}



