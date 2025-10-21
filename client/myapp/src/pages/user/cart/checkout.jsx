import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
    Box,
    Chip,
    IconButton,
    Switch,
    FormGroup
} from '@mui/material';
import { styled } from '@mui/system';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useCart } from '../../../CartContext';
import { useAuth } from '../../../AuthContext';
import { useToast } from '../../../component/Toast';
import { useNavigate } from 'react-router';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';

// Styled components
const CheckoutContainer = styled('div')({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa'
});

const StyledCard = styled(Card)({
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '12px'
});

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#fff',
        '& fieldset': { borderColor: '#ddd' },
        '&:hover fieldset': { borderColor: '#007bff' },
        '&.Mui-focused fieldset': { borderColor: '#007bff' }
    }
});

const CheckoutButton = styled(Button)({
    backgroundColor: '#ff6b35',
    color: '#fff',
    padding: '12px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#e55a2b'
    }
});

// Validation schema
const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    mobile: yup.string().matches(/^\d{10}$/, 'Enter valid 10-digit mobile number').required(),
    pincode: yup.string().matches(/^\d{6}$/, 'Enter valid 6-digit pincode').required(),
    addressLine1: yup.string().required('Address line 1 is required'),
    addressLine2: yup.string(),
    landmark: yup.string(),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required')
});

// Indian states data
const indianStates = [
    { name: 'Andhra Pradesh', code: 'AP' },
    { name: 'Arunachal Pradesh', code: 'AR' },
    { name: 'Assam', code: 'AS' },
    { name: 'Bihar', code: 'BR' },
    { name: 'Chhattisgarh', code: 'CT' },
    { name: 'Goa', code: 'GA' },
    { name: 'Gujarat', code: 'GJ' },
    { name: 'Haryana', code: 'HR' },
    { name: 'Himachal Pradesh', code: 'HP' },
    { name: 'Jharkhand', code: 'JH' },
    { name: 'Karnataka', code: 'KA' },
    { name: 'Kerala', code: 'KL' },
    { name: 'Madhya Pradesh', code: 'MP' },
    { name: 'Maharashtra', code: 'MH' },
    { name: 'Manipur', code: 'MN' },
    { name: 'Meghalaya', code: 'ML' },
    { name: 'Mizoram', code: 'MZ' },
    { name: 'Nagaland', code: 'NL' },
    { name: 'Odisha', code: 'OR' },
    { name: 'Punjab', code: 'PB' },
    { name: 'Rajasthan', code: 'RJ' },
    { name: 'Sikkim', code: 'SK' },
    { name: 'Tamil Nadu', code: 'TN' },
    { name: 'Telangana', code: 'TG' },
    { name: 'Tripura', code: 'TR' },
    { name: 'Uttar Pradesh', code: 'UP' },
    { name: 'Uttarakhand', code: 'UK' },
    { name: 'West Bengal', code: 'WB' }
];

// Pincode to location mapping (sample data - in real app, use API)
const pincodeData = {
    '110001': { city: 'New Delhi', state: 'Delhi', country: 'India' },
    '400001': { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    '560001': { city: 'Bangalore', state: 'Karnataka', country: 'India' },
    '600001': { city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
    '700001': { city: 'Kolkata', state: 'West Bengal', country: 'India' },
    '500001': { city: 'Hyderabad', state: 'Telangana', country: 'India' },
    '411001': { city: 'Pune', state: 'Maharashtra', country: 'India' },
    '380001': { city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
    '273010': { city: 'Gorakhpur', state: 'Uttar Pradesh', country: 'India' },
    '208001': { city: 'Kanpur', state: 'Uttar Pradesh', country: 'India' }
};

const CheckoutPage = () => {
    const { cartItems, subtotal, cartCount } = useCart();
    const { user } = useAuth();
    const { success, error } = useToast();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [useGPS, setUseGPS] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: user?.fName ? `${user.fName} ${user.mName || ''} ${user.lName || ''}`.trim() : '',
            mobile: user?.phone || '',
            country: 'India',
            addressType: 'Home'
        }
    });

    const watchPincode = watch('pincode');
    const watchCountry = watch('country');

    // Auto-fill location based on pincode
    useEffect(() => {
        if (watchPincode && watchPincode.length === 6 && watchCountry === 'India') {
            const locationData = pincodeData[watchPincode];
            if (locationData) {
                setValue('city', locationData.city);
                setValue('state', locationData.state);
                setValue('country', locationData.country);
                success(`Location auto-filled: ${locationData.city}, ${locationData.state}`);
            }
        }
    }, [watchPincode, watchCountry, setValue, success]);

    // GPS Location handler
    const handleGetLocation = () => {
        setLocationLoading(true);
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        // Mock reverse geocoding (in real app, use Google Maps API)
                        setValue('addressLine1', 'Current Location Address');
                        setValue('city', 'Mumbai');
                        setValue('state', 'Maharashtra');
                        setValue('country', 'India');
                        setValue('pincode', '400001');
                        
                        success('Location detected and auto-filled!');
                    } catch (err) {
                        error('Failed to get address from location');
                    } finally {
                        setLocationLoading(false);
                    }
                },
                (err) => {
                    error('Location access denied or unavailable');
                    setLocationLoading(false);
                }
            );
        } else {
            error('GPS not supported by this browser');
            setLocationLoading(false);
        }
    };

    // Calculate totals
    const deliveryCharge = subtotal > 500 ? 0 : 50;
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const totalAmount = subtotal + deliveryCharge + tax;

    // Handle form submission
    const onSubmit = async (data) => {
        if (cartItems.length === 0) {
            error('Your cart is empty');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                ...data,
                items: cartItems,
                subtotal,
                deliveryCharge,
                tax,
                totalAmount
            };

            // API call to create order
            const result = await axios.post(`${import.meta.env.VITE_API_APP_HOST}/user/place-order`, 
                orderData, 
                { withCredentials: true }
            );

            if (result.status === 201) {
                success('Order placed successfully!');
                navigate('/user/orders');
            }
        } catch (err) {
            error(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <CheckoutContainer>
                <StyledCard>
                    <CardContent style={{ textAlign: 'center', padding: '60px' }}>
                        <ShoppingCartIcon style={{ fontSize: '64px', color: '#ddd', marginBottom: '20px' }} />
                        <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                            Add some items to your cart before checkout
                        </Typography>
                        <Button 
                            variant="contained" 
                            onClick={() => navigate('/products')}
                            style={{ marginTop: '20px' }}
                        >
                            Continue Shopping
                        </Button>
                    </CardContent>
                </StyledCard>
            </CheckoutContainer>
        );
    }

    return (
        <CheckoutContainer>
            <Typography variant="h4" gutterBottom style={{ marginBottom: '30px', fontWeight: 'bold' }}>
                Checkout
            </Typography>

            <Grid container spacing={3}>
                {/* Left Column - Address Form */}
                <Grid item xs={12} md={8}>
                    <StyledCard>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <LocationOnIcon color="primary" />
                                <Typography variant="h6" style={{ marginLeft: '8px' }}>
                                    Delivery Address
                                </Typography>
                            </Box>

                            {/* GPS Location Toggle */}
                            <FormGroup row style={{ marginBottom: '20px' }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={useGPS}
                                            onChange={(e) => setUseGPS(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Use GPS Location"
                                />
                                {useGPS && (
                                    <IconButton 
                                        color="primary" 
                                        onClick={handleGetLocation}
                                        disabled={locationLoading}
                                        size="small"
                                    >
                                        <MyLocationIcon />
                                    </IconButton>
                                )}
                            </FormGroup>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    {/* Full Name */}
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="fullName"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledTextField
                                                    {...field}
                                                    fullWidth
                                                    label="Full Name"
                                                    error={!!errors.fullName}
                                                    helperText={errors.fullName?.message}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    {/* Mobile */}
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="mobile"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledTextField
                                                    {...field}
                                                    fullWidth
                                                    label="Mobile Number"
                                                    error={!!errors.mobile}
                                                    helperText={errors.mobile?.message}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    {/* Pincode */}
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="pincode"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledTextField
                                                    {...field}
                                                    fullWidth
                                                    label="Pincode"
                                                    error={!!errors.pincode}
                                                    helperText={errors.pincode?.message}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    {/* Country */}
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="country"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledTextField
                                                    {...field}
                                                    fullWidth
                                                    select
                                                    label="Country"
                                                    error={!!errors.country}
                                                    helperText={errors.country?.message}
                                                >
                                                    <MenuItem value="India">India</MenuItem>
                                                    <MenuItem value="USA">USA</MenuItem>
                                                    <MenuItem value="UK">UK</MenuItem>
                                                    <MenuItem value="Canada">Canada</MenuItem>
                                                </StyledTextField>
                                            )}
                                        />
                                    </Grid>

                                    {/* Address Line 1 */}
                                    <Grid item xs={12}>
                                        <Controller
                                            name="addressLine1"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledTextField
                                                    {...field}
                                                    fullWidth
                                                    label="Address Line 1 (House No, Building, Street)"
                                                    error={!!errors.addressLine1}
                                                    helperText={errors.addressLine1?.message}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    {/* Address Line 2 */}
                                    <Grid item xs={12}>
                                        <Controller
                                            name="addressLine2"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledTextField
                                                    {...field}
                                                    fullWidth
                                                    label="Address Line 2 (Area, Colony) - Optional"
                                                />
                                            )}
                                        />
                                    </Grid>

                                    {/* Landmark */}
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="landmark"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledTextField
                                                    {...field}
                                                    fullWidth
                                                    label="Landmark (Optional)"
                                                />
                                            )}
                                        />
                                    </Grid>

                                    {/* City */}
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="city"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledTextField
                                                    {...field}
                                                    fullWidth
                                                    label="City"
                                                    error={!!errors.city}
                                                    helperText={errors.city?.message}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    {/* State */}
                                    <Grid item xs={12}>
                                        <Controller
                                            name="state"
                                            control={control}
                                            render={({ field }) => (
                                                <StyledTextField
                                                    {...field}
                                                    fullWidth
                                                    select
                                                    label="State"
                                                    error={!!errors.state}
                                                    helperText={errors.state?.message}
                                                >
                                                    {indianStates.map((state) => (
                                                        <MenuItem key={state.code} value={state.name}>
                                                            {state.name}
                                                        </MenuItem>
                                                    ))}
                                                </StyledTextField>
                                            )}
                                        />
                                    </Grid>

                                    {/* Address Type */}
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <FormLabel>Address Type</FormLabel>
                                            <Controller
                                                name="addressType"
                                                control={control}
                                                render={({ field }) => (
                                                    <RadioGroup {...field} row>
                                                        <FormControlLabel
                                                            value="Home"
                                                            control={<Radio />}
                                                            label="Home (All day delivery)"
                                                        />
                                                        <FormControlLabel
                                                            value="Work"
                                                            control={<Radio />}
                                                            label="Work (10 AM - 5 PM)"
                                                        />
                                                    </RadioGroup>
                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </StyledCard>
                </Grid>

                {/* Right Column - Order Summary */}
                <Grid item xs={12} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            <Divider style={{ margin: '10px 0' }} />

                            {/* Cart Items */}
                            {cartItems.map((item, index) => (
                                <Box key={index} style={{ marginBottom: '15px' }}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <img
                                            src={item.productId?.images?.[0] || '/placeholder.jpg'}
                                            alt={item.productId?.name || 'Product'}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Box flex={1}>
                                            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                                {item.productId?.name || 'Product Name'}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                Qty: {item.quantity}
                                            </Typography>
                                            <Typography variant="body2" style={{ color: '#ff6b35', fontWeight: 'bold' }}>
                                                ₹{item.productId?.discountValue 
                                                    ? Math.round(item.productId.price * (1 - item.productId.discountValue / 100))
                                                    : item.productId?.price || 0
                                                } × {item.quantity}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider style={{ margin: '10px 0' }} />
                                </Box>
                            ))}

                            {/* Price Breakdown */}
                            <Box style={{ marginTop: '20px' }}>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>Items ({cartCount})</Typography>
                                    <Typography>₹{subtotal}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>Delivery</Typography>
                                    <Typography color={deliveryCharge === 0 ? 'green' : 'inherit'}>
                                        {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>Tax (18%)</Typography>
                                    <Typography>₹{tax}</Typography>
                                </Box>
                                <Divider style={{ margin: '10px 0' }} />
                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                        Total Amount
                                    </Typography>
                                    <Typography variant="h6" style={{ fontWeight: 'bold', color: '#ff6b35' }}>
                                        ₹{totalAmount}
                                    </Typography>
                                </Box>

                                {/* Savings Info */}
                                {deliveryCharge === 0 && (
                                    <Chip 
                                        icon={<LocalShippingIcon />}
                                        label="You saved ₹50 on delivery!" 
                                        color="success" 
                                        size="small"
                                        style={{ marginBottom: '15px' }}
                                    />
                                )}

                                {/* Security Info */}
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <SecurityIcon color="success" fontSize="small" />
                                    <Typography variant="caption" color="textSecondary">
                                        Safe and Secure Payments
                                    </Typography>
                                </Box>

                                {/* Place Order Button */}
                                <CheckoutButton
                                    fullWidth
                                    size="large"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={loading}
                                >
                                    {loading ? 'Placing Order...' : `Place Order - ₹${totalAmount}`}
                                </CheckoutButton>
                            </Box>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>
        </CheckoutContainer>
    );
};

export default CheckoutPage;
