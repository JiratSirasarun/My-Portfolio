import { useState } from 'react';
import { formatBaht } from '../format.js';
import { CartIcon, ChevronIcon, TicketIcon } from './Icons.jsx';

// Placeholder PDP reached from the product/coupon card. No real cart logic.
export default function ProductDetailScreen({ product, cartCount, onBack, onAddToCart, onToast }) {
  const [qty, setQty] = useState(1);
  const [collected, setCollected] = useState(false);
  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="pdp">
      <header className="pdp-header">
        <button type="button" className="icon-btn" aria-label="Back to video" onClick={onBack}>
          <ChevronIcon dir="left" width={26} height={26} />
        </button>
        <span className="pdp-header-title">Product details</span>
        <span className="cart-btn" aria-label={`Cart, ${cartCount} items`}>
          <CartIcon />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </span>
      </header>

      <div className="pdp-scroll">
        <div className="pdp-image-wrap">
          <img className="pdp-image" src={product.productImage} alt={product.productName} />
          {discountPct > 0 && <span className="pdp-discount">-{discountPct}%</span>}
        </div>

        <div className="pdp-section">
          <div className="pdp-price-row">
            <span className="pdp-price">{formatBaht(product.price)}</span>
            {product.originalPrice && <span className="pdp-original">{formatBaht(product.originalPrice)}</span>}
          </div>
          <h1 className="pdp-name">{product.productName}</h1>
          <span className="pdp-unit">{product.unit}</span>
        </div>

        <div className="pdp-section">
          <div className="pdp-coupon">
            <div className="pdp-coupon-left">
              <span className="coupon-badge">
                <TicketIcon /> Coupon
              </span>
              <span className="pdp-coupon-text">{product.couponText}</span>
              <span className="pdp-coupon-sub">
                Min. spend {formatBaht(product.couponMinSpend)} · Save {formatBaht(product.couponDiscount)}
              </span>
            </div>
            <button
              type="button"
              className={`collect-btn${collected ? ' collected' : ''}`}
              onClick={() => {
                if (!collected) onToast('Coupon collected');
                setCollected(true);
              }}
            >
              {collected ? 'Collected ✓' : 'Collect'}
            </button>
          </div>
        </div>

        <div className="pdp-section">
          <h2 className="pdp-subhead">About this product</h2>
          <p className="pdp-desc">{product.description}</p>
        </div>
      </div>

      <footer className="pdp-footer">
        <div className="qty" aria-label="Quantity">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span>{qty}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
            +
          </button>
        </div>
        <button type="button" className="add-to-cart" onClick={() => onAddToCart(qty)}>
          Add to Cart · {formatBaht(product.price * qty)}
        </button>
      </footer>
    </div>
  );
}
