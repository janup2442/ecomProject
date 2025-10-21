import {useState,useEffect} from 'react'
import { Link } from 'react-router';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../../../CartContext';
import { useToast } from '../../../component/Toast';
import Loader from '../../../component/loader';

export default function Cart() {
    const { cartItems, cartCount, subtotal, isLoading, updateCartQuantity, removeFromCart } = useCart();
    const { addToast } = useToast();

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        const result = await updateCartQuantity(productId, newQuantity);
        if (result.success) {
            addToast('Cart updated successfully', 'success');
        } else {
            addToast(result.message || 'Failed to update cart', 'error');
        }
    };

    const handleRemoveItem = async (productId) => {
        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
            const result = await removeFromCart(productId);
            if (result.success) {
                addToast('Item removed from cart', 'info');
            } else {
                addToast(result.message || 'Failed to remove item', 'error');
            }
        }
    };

    if (isLoading) {
        return <Loader message="Loading your cart..." />;
    }

    return (
        <div className="container py-4">
            {cartItems && cartItems.length > 0 ? (
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">
                                    <ShoppingCartIcon className="me-2" />
                                    Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                                </h4>
                            </div>
                            <div className="card-body p-0">
                                {cartItems.map((item) => (
                                    <CartItem 
                                        key={item.productId._id}
                                        item={item}
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={handleRemoveItem}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <CartSummary 
                            subtotal={subtotal} 
                            itemCount={cartCount}
                        />
                    </div>
                </div>
            ) : (
                <EmptyCart />
            )}
        </div>
    );
}

function CartItem({ item, onQuantityChange, onRemove }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const { productId, quantity } = item;
    
    const discountedPrice = productId.discountValue 
        ? Math.round(productId.price * (1 - productId.discountValue / 100))
        : productId.price;
    
    const totalPrice = discountedPrice * quantity;
    console.log(item.productId);
    

    const handleQuantityUpdate = async (newQuantity) => {
        setIsUpdating(true);
        await onQuantityChange(productId.id, newQuantity);
        setIsUpdating(false);
    };

    return (
        <div className="border-bottom p-3">
            <div className="row align-items-center">
                <div className="col-3 col-md-2">
                    <img 
                        src={productId.images[0]} 
                        alt={productId.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: '100px', objectFit: 'cover' }}
                    />
                </div>
                
                <div className="col-9 col-md-4">
                    <Link 
                        to={`/product/${productId.id}`} 
                        className="text-decoration-none text-dark"
                    >
                        <h6 className="mb-1">{productId.name}</h6>
                    </Link>
                    <p className="text-muted small mb-1">{productId.brand}</p>
                    <div className="d-flex align-items-center">
                        <span className="fw-bold text-success">₹{discountedPrice}</span>
                        {productId.discountValue > 0 && (
                            <>
                                <span className="text-decoration-line-through text-muted ms-2 small">
                                    ₹{productId.price}
                                </span>
                                <span className="badge bg-success ms-2">
                                    {productId.discountValue}% OFF
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="col-6 col-md-3 mt-3 mt-md-0">
                    <div className="d-flex align-items-center">
                        <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleQuantityUpdate(quantity - 1)}
                            disabled={quantity <= 1 || isUpdating}
                        >
                            <RemoveIcon fontSize="small" />
                        </button>
                        <span className="mx-3 fw-semibold">{quantity}</span>
                        <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleQuantityUpdate(quantity + 1)}
                            disabled={isUpdating}
                        >
                            <AddIcon fontSize="small" />
                        </button>
                    </div>
                </div>

                <div className="col-3 col-md-2 mt-3 mt-md-0 text-center">
                    <div className="fw-bold mb-2">₹{totalPrice}</div>
                    <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onRemove(productId.id)}
                        title="Remove item"
                    >
                        <DeleteIcon fontSize="small" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function CartSummary() {
    const { cartItems, cartCount, subtotal, isLoading } = useCart();
    const itemCount = cartCount;
    const deliveryCharges = subtotal > 500 ? 0 : 40;
    const total = subtotal + deliveryCharges;

    return (
        <div className="card sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-light">
                <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                    <span>Items ({itemCount}):</span>
                    <span>₹{subtotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span>Delivery Charges:</span>
                    <span className={deliveryCharges === 0 ? 'text-success' : ''}>
                        {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                    </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                    <span>Total:</span>
                    <span>₹{total}</span>
                </div>
                
                {subtotal < 500 && (
                    <div className="alert alert-info mt-3">
                        <small>Add ₹{500 - subtotal} more to get FREE delivery!</small>
                    </div>
                )}
            </div>
            <div className="card-footer">
                <Link 
                    to="/user/cart/checkout" 
                    className="btn btn-primary w-100 py-2"
                >
                    Proceed to Checkout
                </Link>
                <Link 
                    to="/" 
                    className="btn btn-outline-secondary w-100 mt-2"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}

function EmptyCart() {
    return (
        <div className="text-center py-5">
            <ShoppingCartIcon style={{ fontSize: '6rem', color: '#6c757d' }} />
            <h3 className="text-muted mt-3">Your cart is empty</h3>
            <p className="text-muted mb-4">
                Looks like you haven't added any items to your cart yet.
                <br />
                Discover our amazing leather products and add them to your cart!
            </p>
            <Link to="/" className="btn btn-primary btn-lg">
                Start Shopping
            </Link>
        </div>
    );
}