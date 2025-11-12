import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE, getImageFallback } from "../../lib/api";
import ImportModal from "../../components/ImportModal";
import { AuthContext } from "../../contex/AuthContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios.get(`${API_BASE}/products/${id}`).then(res => {
      if (mounted) setProduct(res.data);
    }).finally(() => setLoading(false));
    return () => (mounted = false);
  }, [id]);

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
  const { productName, imageUrl, price, originCountry, rating, availableQuantity, description } = product;

  return (
    <div className="space-y-6">
      <Helmet><title>{productName} • Import Export Hub</title></Helmet>
      <div className="grid md:grid-cols-2 gap-6">
        <img className="w-full rounded-xl object-cover max-h-[420px]" src={getImageFallback(imageUrl)} alt={productName} />
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold">{productName}</h2>
          <p className="opacity-80">{description || "No description provided."}</p>
          <div className="grid grid-cols-2 gap-1">
            <span>Price: ${price}</span>
            <span>Country: {originCountry}</span>
            <span>Rating: {rating}</span>
            <span>Available: {availableQuantity}</span>
          </div>
          <button onClick={() => setOpen(true)} className="btn btn-primary" disabled={availableQuantity <= 0}>Import Now</button>
        </div>
      </div>
      <ImportModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={submitImport}
        maxQuantity={availableQuantity || 0}
      />
    </div>
  );
}


