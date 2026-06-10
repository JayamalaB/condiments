import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const emptyForm = { name: "", price: "", imageUrl: "", description: "", category: "" };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [adding, setAdding] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then((r) => r.json())
      .then((d) => setProducts(Array.isArray(d) ? d : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError("");
    setAdding(true);
    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      if (!res.ok) throw new Error("Failed to add product");
      setForm(emptyForm);
      fetchProducts();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const res = await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
    if (res.ok) fetchProducts();
    else alert("Failed to delete.");
  };

  const f = (key) => ({ value: form[key], onChange: (e) => setForm({ ...form, [key]: e.target.value }) });

  return (
    <div>
      {/* Add Product Form */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
          <FaPlus className="text-primary" /> Add New Product
        </h5>
        {formError && <div className="alert alert-danger py-2">{formError}</div>}
        <form onSubmit={handleAdd}>
          <div className="row g-3">
            <div className="col-md-5">
              <input className="form-control" placeholder="Product Name *" required {...f("name")} />
            </div>
            <div className="col-md-3">
              <input type="number" className="form-control" placeholder="Price ₹ *" required min="1" {...f("price")} />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="Category (e.g. Snacks)" {...f("category")} />
            </div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Image URL *" required {...f("imageUrl")} />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="Description" {...f("description")} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3 px-4" disabled={adding}>
            {adding ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      {/* Products Table */}
      <div className="card p-4 shadow-sm">
        <h5 className="fw-bold mb-3">Products in Database ({products.length})</h5>
        {loading ? (
          <div className="text-center py-3"><div className="spinner-border text-primary" /></div>
        ) : products.length === 0 ? (
          <p className="text-muted">No products added yet. Add one above.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </td>
                    <td className="fw-semibold">{p.name}</td>
                    <td><span className="badge bg-warning text-dark">{p.category || "—"}</span></td>
                    <td className="text-danger fw-bold">₹{p.price}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                        onClick={() => handleDelete(p._id)}
                      >
                        <FaTrash size={12} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
