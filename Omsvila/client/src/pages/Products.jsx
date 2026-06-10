import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCardUser from '../components/ProductCardUser';
import { products as sampleProducts } from '../data/sampleData';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const isProductsPage = pathname === '/products';

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.map((p) => ({
            image: p.imageUrl,
            name: p.name,
            desc: p.description || '',
            price: p.price,
            _id: p._id,
          })));
        } else {
          setProducts(sampleProducts);
        }
      })
      .catch(() => setProducts(sampleProducts))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <section className="products-section py-5">
      <div className="container">
        <h2 className="section-title text-start mb-5">
          Our <span className="">Products</span>
        </h2>
        <div className="row g-4">
          {products.map((item, i) => (
            <div key={item._id || i} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
              <ProductCardUser {...item} />
            </div>
          ))}
        </div>
        {!isProductsPage && (
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-primary text-white px-4 py-2">
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
