import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function AddExport() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    productName: "",
    imageUrl: "",
    price: "",
    originCountry: "",
    rating: "",
    availableQuantity: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), rating: Number(form.rating), availableQuantity: Number(form.availableQuantity), userEmail: user?.email };
      await axios.post(`${API_BASE}/products`, payload);
      toast.success("Product added");
      setForm({ productName: "", imageUrl: "", price: "", originCountry: "", rating: "", availableQuantity: "", description: "" });
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Helmet><title>Add Export • Import Export Hub</title></Helmet>
      <h2 className="text-2xl font-semibold mb-4">Add Export/Product</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <input className="input input-bordered" placeholder="Product Name" name="productName" value={form.productName} onChange={handleChange} required />
        <input className="input input-bordered" placeholder="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} required />
        <input className="input input-bordered" placeholder="Price" type="number" name="price" value={form.price} onChange={handleChange} required />
        <input className="input input-bordered" placeholder="Origin Country" name="originCountry" value={form.originCountry} onChange={handleChange} required />
        <input className="input input-bordered" placeholder="Rating" type="number" name="rating" value={form.rating} onChange={handleChange} required />
        <input className="input input-bordered" placeholder="Available Quantity" type="number" name="availableQuantity" value={form.availableQuantity} onChange={handleChange} required />
        <button className="btn btn-primary md:col-span-2" disabled={loading}>{loading ? "Adding..." : "Add Export/Product"}</button>
      </form>
    </div>
  );
}


