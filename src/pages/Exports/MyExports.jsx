import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function MyExports() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const load = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/my-exports/${user.email}`);
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, [user?.email]);

  const remove = async (id) => {
    await axios.delete(`${API_BASE}/products/${id}`);
    toast.success("Deleted");
    setItems((list) => list.filter((i) => i._id !== id));
  };
  const startEdit = (item) => {
    setEditing(item._id);
    setEditForm({
      productName: item.productName,
      imageUrl: item.imageUrl,
      price: item.price,
      originCountry: item.originCountry,
      rating: item.rating,
      availableQuantity: item.availableQuantity,
      description: item.description || "",
    });
  };
  const submitEdit = async () => {
    await axios.patch(`${API_BASE}/products/${editing}`, {
      ...editForm,
      price: Number(editForm.price),
      rating: Number(editForm.rating),
      availableQuantity: Number(editForm.availableQuantity),
    });
    toast.success("Updated");
    setEditing(null);
    await load();
  };

  return (
    <div className="space-y-6">
      <Helmet><title>My Exports • Import Export Hub</title></Helmet>
      <h2 className="text-2xl font-semibold">My Exports</h2>
      {loading ? <div className="min-h-[200px] grid place-items-center"><span className="loading loading-spinner loading-lg" /></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className="card bg-base-100 border border-base-300">
              <figure className="aspect-video"><img className="w-full h-full object-cover" src={item.imageUrl} alt={item.productName} /></figure>
              <div className="card-body">
                <h3 className="card-title">{item.productName}</h3>
                <p>Price: ${item.price}</p>
                <p>Available: {item.availableQuantity}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-error btn-sm" onClick={() => remove(item._id)}>Delete</button>
                  <button className="btn btn-outline btn-sm" onClick={() => startEdit(item)}>Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center px-4">
          <div className="bg-base-100 rounded-xl w-full max-w-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">Update Product</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(editForm).map(([key, value]) => (
                key === "description" ? (
                  <textarea key={key} className="textarea textarea-bordered col-span-2" placeholder="Description" value={value} onChange={(e) => setEditForm((f) => ({ ...f, [key]: e.target.value }))} />
                ) : (
                  <input key={key} className="input input-bordered" placeholder={key} value={value} onChange={(e) => setEditForm((f) => ({ ...f, [key]: e.target.value }))} />
                )
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitEdit}>Submit</button>
            </div>
          </div>
        </div>
      )}
      {!loading && items.length === 0 && <div className="opacity-70">You haven't added any exports yet.</div>}
      
    </div>
  );
}


