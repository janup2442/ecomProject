// ProductCard.jsx
import { useState } from "react";

export default function ProductCard({
  image,
  name,
  brand,
  rating,      // floating value, e.g. 4.3
  price,
  discount,    // percentage, e.g. 20
  caption,
  onAddToCart,
  onBuyNow,
  onWishlist,
  isWishlisted = false,
}) {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  // Calculate discounted price
  const discountedPrice = discount
    ? Math.round(price * (1 - discount / 100))
    : price;

  // Render stars based on rating
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={"full" + i} style={{ color: "#FFD700" }}>★</span>
        ))}
        {halfStar && <span style={{ color: "#FFD700" }}>☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={"empty" + i} style={{ color: "#ccc" }}>★</span>
        ))}
        <span className="ms-2 text-muted" style={{ fontSize: "0.9em" }}>{rating.toFixed(1)}</span>
      </>
    );
  };

  const handleWishlist = () => {
    setWishlisted((prev) => !prev);
    if (onWishlist) onWishlist(!wishlisted);
  };

  return (
    <div className="card position-relative shadow-sm" style={{ width: 260 }}>
      {/* Wishlist Heart */}
      <button
        type="button"
        className="btn btn-link position-absolute top-0 end-0 m-2 p-0"
        style={{ zIndex: 2 }}
        onClick={handleWishlist}
        aria-label="Add to wishlist"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={wishlisted ? "red" : "none"}
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
        </svg>
      </button>

      {/* Product Image */}
      <img
        src={image}
        className="card-img-top"
        alt={name}
        style={{ height: 180, objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{name}</h5>
        <div className="mb-1 text-muted" style={{ fontSize: "0.95em" }}>{brand}</div>
        <div className="mb-2">{renderStars()}</div>
        <div className="mb-2">
          <span className="fw-bold fs-5 me-2">₹{discountedPrice}</span>
          {discount > 0 && (
            <>
              <span className="text-decoration-line-through text-muted me-1">₹{price}</span>
              <span className="badge bg-success">{discount}% OFF</span>
            </>
          )}
        </div>
        <div className="mb-3" style={{ fontSize: "0.95em" }}>{caption}</div>
        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-outline-primary flex-fill" onClick={onAddToCart}>Add to Cart</button>
          <button className="btn btn-success flex-fill" onClick={onBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}