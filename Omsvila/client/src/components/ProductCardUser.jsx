import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const WEIGHT_OPTIONS = [
  { label: "250g",  multiplier: 0.5  },
  { label: "500g",  multiplier: 1    },
  { label: "1 kg",  multiplier: 1.8  },
];

const ProductCardUser = ({ image, name, desc, price }) => {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState(WEIGHT_OPTIONS[1]); // default 500g

  const finalPrice = Math.round(price * selected.multiplier);

  return (
    <div className="card shadow-sm rounded-4 overflow-hidden" style={{ width: '100%', maxWidth: '300px' }}>
      <div className="bg-warning-subtle p-3 text-center">
        <img
          src={image}
          alt={name}
          className="img-fluid"
          style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title fw-bold mb-1">{name}</h5>
        <p className="card-text text-muted small mb-2">{desc}</p>

        {/* Weight selector */}
        <div className="d-flex gap-1 mb-3">
          {WEIGHT_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              className={`btn btn-sm fw-semibold px-2 py-1 ${
                selected.label === opt.label
                  ? 'btn-warning text-white'
                  : 'btn-outline-secondary'
              }`}
              style={{ fontSize: '0.75rem', borderRadius: 20 }}
              onClick={() => setSelected(opt)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-bold text-danger fs-5">₹{finalPrice}</span>
            {selected.label !== "500g" && (
              <span className="text-muted small ms-1 text-decoration-line-through">₹{price}</span>
            )}
          </div>
          <button
            className="btn btn-warning text-white fw-semibold px-3 py-1"
            onClick={() => addToCart({ image, name, desc, price: finalPrice, weight: selected.label })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardUser;
