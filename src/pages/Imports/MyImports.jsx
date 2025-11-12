import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../lib/api";
import { AuthContext } from "../../contex/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function MyImports() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/my-imports/${user.email}`);
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, [user?.email]);

  const remove = async (id) => {
    await axios.delete(`${API_BASE}/imports/${id}`);
    toast.success("Removed");
    setItems((list) => list.filter((i) => i._id !== id));
  };

  return (
    <div className="space-y-6">
      <Helmet><title>My Imports • Import Export Hub</title></Helmet>
      <h2 className="text-2xl font-semibold">My Imports</h2>
      {loading ? <div className="min-h-[200px] grid place-items-center"><span className="loading loading-spinner loading-lg" /></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className="card bg-base-100 border border-base-300">
              <figure className="aspect-video"><img className="w-full h-full object-cover" src={item.imageUrl} alt={item.productName} /></figure>
              <div className="card-body">
                <h3 className="card-title">{item.productName}</h3>
                <div className="grid grid-cols-2 text-sm">
                  <span>Price: ${item.price}</span>
                  <span>Rating: {item.rating}</span>
                  <span>Country: {item.originCountry}</span>
                  <span>Qty: {item.importedQuantity}</span>
                </div>
                <div className="card-actions justify-between">
                  <button className="btn btn-error btn-sm" onClick={() => remove(item._id)}>Remove</button>
                  <Link to={`/products/${item.productId}`} className="btn btn-outline btn-sm">See Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && items.length === 0 && <div className="opacity-70">You have no imports yet.</div>}
    </div>
  );
}


