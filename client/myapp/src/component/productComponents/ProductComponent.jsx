
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import Divider from "@mui/material/Divider";
import { useCart } from "../../CartContext";
import { useAuth } from "../../AuthContext";
import { useToast } from "../Toast";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';


function ProductSlider({ imagesArray = null ,productId}) {
    const { addToCart, isLoading: cartLoading } = useCart();
    const { isAuthenticated } = useAuth();
    const { addToast } = useToast();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            addToast('Please login to add items to cart', 'warning');
            navigate('/login');
            return;
        }

        setIsAddingToCart(true);
        const result = await addToCart(productId, quantity);
        setIsAddingToCart(false);

        if (result.success) {
            addToast(`${quantity} item(s) added to cart successfully!`, 'success');
        } else {
            addToast(result.message, 'error');
        }
    }

    const handleBuyNow = async () => {
        if (!isAuthenticated) {
            addToast('Please login to continue', 'warning');
            navigate('/login');
            return;
        }
        
        setIsAddingToCart(true);
        const result = await addToCart(productId, quantity);
        setIsAddingToCart(false);
        
        if (result.success) {
            addToast('Redirecting to cart...', 'info');
            setTimeout(() => navigate('/user/cart'), 1000);
        } else {
            addToast(result.message, 'error');
        }
    }

    return (
        <>
            <div className="border p-3 shadow-sm rounded my-3 bg-light">
                {
                    imagesArray.length > 0 ? (
                        <div id="carouselCaptions" className="carousel slide">
                            <div className="carousel-inner">
                                {
                                    imagesArray ? (
                                        imagesArray.map((img, index) => (
                                            <div key={index} className={`carousel-item ${index == 0 ? 'active' : ''}`}>
                                                <img 
                                                    src={img} 
                                                    className="d-block w-100" 
                                                    alt={`product_image_${index + 1}`}
                                                    style={{ 
                                                        height: '400px', 
                                                        objectFit: 'cover' 
                                                    }}
                                                />
                                            </div>
                                        ))
                                    ) : null
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselCaptions" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselCaptions" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    ) : null
                }

                {/* Quantity and Action Buttons */}
                <div className="my-3">
                    <div className="row align-items-center mb-3">
                        <div className="col-4">
                            <label className="form-label fw-semibold">Quantity:</label>
                            <select 
                                className="form-select" 
                                value={quantity} 
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                disabled={isAddingToCart}
                            >
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="row row-cols-1 row-cols-md-2 g-2">
                        <div className="col">
                            <button 
                                type="button" 
                                onClick={handleAddToCart} 
                                className="btn btn-outline-warning w-100 py-3 fw-semibold d-flex align-items-center justify-content-center"
                                disabled={isAddingToCart}
                            >
                                <ShoppingCartIcon className="me-2" />
                                {isAddingToCart ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Adding...
                                    </>
                                ) : (
                                    'Add To Cart'
                                )}
                            </button>
                        </div>
                        <div className="col">
                            <button 
                                onClick={handleBuyNow}
                                className="btn btn-warning w-100 py-3 fw-semibold d-flex align-items-center justify-content-center text-white"
                                disabled={isAddingToCart}
                            >
                                <FlashOnIcon className="me-2" />
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProductDetails({ title, children, brand, category, subcategory }) {
    return (
        <>
            <div className="py-3 bg-light" style={{ backgroundColor: 'white' }}>
                <div className="text-muted fw-semibold opacity-75">{brand}</div>
                <div className="fs-4 fw-semibold">{title}</div>
                <div className="d-flex opacity-75 align-items-baseline gap-1">
                    <span className="text-muted">in </span>
                    <span className="fw-semibold">{category}</span>
                    <span className="text-primary" style={{ fontSize: '0.8rem' }}> & {subcategory}</span>
                </div>
                <Divider />
                <div className="py-2">
                    {children}
                </div>
            </div>
        </>
    )
}

function Section({ title, children }) {
    return (
        <>
            <div className="my-3 bg-light">
                <h5>{title}</h5>
                <Divider />
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}


function ReviewsContainer({ children, title }) {
    return (
        <>
            <div className="my-3 bg-light p-3">
                <h5>{title}</h5>
                <Divider />
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export { ProductSlider, ProductDetails, Section, ReviewsContainer };