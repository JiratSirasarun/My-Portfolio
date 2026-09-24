import { formatBaht } from '../format.js';
import { ChevronIcon, TicketIcon } from './Icons.jsx';

// Compact promo unit above the caption. The whole card opens the PDP.
export default function ProductCouponCard({ product, onOpen }) {
  return (
    <button type="button" className="product-card" onClick={onOpen} aria-label={`View ${product.productName}`}>
      <img className="product-card-thumb" src={product.productImage} alt="" />
      <span className="product-card-body">
        <span className="product-card-name">{product.productName}</span>
        <span className="product-card-meta">
          <span className="coupon-badge">
            <TicketIcon /> {product.couponText}
          </span>
        </span>
      </span>
      <span className="product-card-price">
        {formatBaht(product.price)}
        <ChevronIcon dir="right" width={16} height={16} />
      </span>
    </button>
  );
}
