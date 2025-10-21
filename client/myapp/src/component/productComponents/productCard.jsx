// ProductCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../CartContext";
import { useAuth } from "../../AuthContext";
import { useToast } from "../Toast";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductCard({
  image,
  name,
  brand,
  rating = 3.6,      // floating value, e.g. 4.3
  price,
  discount,    // percentage, e.g. 20
  caption = null,
  onWishlist,
  isWishlisted = false,
  productId // Add productId prop for cart functionality
}) {
  const [wishlisted, setWishlisted] = useState(isWishlisted);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

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

  const handleQuickAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation();
    
    if (!isAuthenticated) {
      addToast('Please login to add items to cart', 'warning');
      navigate('/login');
      return;
    }

    setIsAddingToCart(true);
    const result = await addToCart(productId, 1);
    setIsAddingToCart(false);

    if (result.success) {
      addToast('Added to cart successfully!', 'success');
    } else {
      addToast(result.message, 'error');
    }
  };

  return (
    <div className="card position-relative shadow-sm h-100">
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
          viewBox="0 0 28 28"
          fill={wishlisted ? "red" : "none"}
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
        </svg>
      </button>

      {/* Product Image with Fixed Aspect Ratio */}
      <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
        <img
          src={image}
          className="card-img-top w-100 h-100"
          alt={name}
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate" title={name}>{name}</h5>
        <div className="text-muted mb-1" style={{ fontSize: "0.9em" }}>{brand}</div>
        <div className="mb-2">{renderStars()}</div>
        <div className="mt-auto">
          <span className="fw-semibold me-2">₹{discountedPrice}</span>
          {discount > 0 && (
            <>
              <small className="text-decoration-line-through text-muted me-1">₹{price}</small>
              <span className="badge bg-success">{discount}% OFF</span>
            </>
          )}
        </div>
        {caption && (
          <div className="form-text mt-1" style={{ fontSize: "0.8em" }}>{caption}</div>
        )}
      </div>
      
      {/* Quick Add to Cart Button */}
      <div className="card-footer bg-transparent p-2">
        <button
          className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center"
          onClick={handleQuickAddToCart}
          disabled={isAddingToCart}
        >
          <AddShoppingCartIcon fontSize="small" className="me-2" />
          {isAddingToCart ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Adding...
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
}