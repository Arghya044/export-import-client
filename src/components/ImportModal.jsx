import { useState } from "react";

export default function ImportModal({ open, onClose, onSubmit, maxQuantity }) {
  const [qty, setQty] = useState(1);
  const invalid = !qty || qty <= 0 || qty > maxQuantity;
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 grid place-items-center px-4">
      <div className="bg-base-100 rounded-xl w-full max-w-md p-6 space-y-4">
        <h3 className="text-lg font-semibold">Import Product</h3>
        <label className="form-control">
          <div className="label"><span className="label-text">Quantity (max {maxQuantity})</span></div>
          <input
            type="number"
            min={1}
            max={maxQuantity}
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value))}
            className="input input-bordered"
            placeholder="Enter quantity"
          />
          {qty > maxQuantity && <span className="text-error text-sm mt-1">Cannot exceed available quantity.</span>}
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={invalid} onClick={() => onSubmit(qty)}>Submit</button>
        </div>
      </div>
    </div>
  );
}


