import React, { useState } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel
} from '@mui/material';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// High-contrast black/white styles
const BWMuiTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        color: '#000',
        backgroundColor: '#fff',
        '& fieldset': { borderColor: '#000' },
        '&:hover fieldset': { borderColor: '#000' },
        '&.Mui-focused fieldset': { borderColor: '#000' },
    },
    '& .MuiFormHelperText-root': { color: '#900' },
});

const BWButton = styled(Button)({
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#444',
    },
});

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    mobile: yup
        .string()
        .matches(/^\d{10}$/, 'Enter a valid 10-digit number')
        .required(),
    pincode: yup
        .string()
        .matches(/^\d{6}$/, 'Enter a valid 6-digit pincode')
        .required(),
    locality: yup.string().required('Locality is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    landmark: yup.string(),
    alternatePhone: yup
        .string()
        .matches(/^\d{10}$/, 'Enter a valid 10-digit number')
        .nullable(),
    addressType: yup.string().required('Select address type'),
});

const CheckoutPage = () => {
    const [geoError, setGeoError] = useState('');
    const [suggestedCity, setSuggestedCity] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const formData = watch();

    const onSubmit = (data) => {
        console.log('Submitted Data:', data);
    };

    const useCurrentLocation = () => {
        if (!navigator.geolocation) {
            setGeoError('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );
                    const json = await res.json();
                    const { postcode, road, suburb, city, state } = json.address;
                    // Prefill form fields
                    if (postcode) setValue('pincode', postcode);
                    const locality = [road, suburb].filter(Boolean).join(', ');
                    setValue('locality', locality);
                    setValue('city', city || '');
                    setValue('state', state || '');
                    setGeoError('');
                } catch {
                    setGeoError('Unable to fetch address from coordinates');
                }
            },
            (err) => setGeoError('Error: ' + err.message)
        );
    };

    const indianStates = [
        { name: "Andhra Pradesh", type: "State", code: "IN-AP" },
        { name: "Arunachal Pradesh", type: "State", code: "IN-AR" },
        { name: "Assam", type: "State", code: "IN-AS" },
        { name: "Bihar", type: "State", code: "IN-BR" },
        { name: "Chhattisgarh", type: "State", code: "IN-CT" },
        { name: "Goa", type: "State", code: "IN-GA" },
        { name: "Gujarat", type: "State", code: "IN-GJ" },
        { name: "Haryana", type: "State", code: "IN-HR" },
        { name: "Himachal Pradesh", type: "State", code: "IN-HP" },
        { name: "Jharkhand", type: "State", code: "IN-JH" },
        { name: "Karnataka", type: "State", code: "IN-KA" },
        { name: "Kerala", type: "State", code: "IN-KL" },
        { name: "Madhya Pradesh", type: "State", code: "IN-MP" },
        { name: "Maharashtra", type: "State", code: "IN-MH" },
        { name: "Manipur", type: "State", code: "IN-MN" },
        { name: "Meghalaya", type: "State", code: "IN-ML" },
        { name: "Mizoram", type: "State", code: "IN-MZ" },
        { name: "Nagaland", type: "State", code: "IN-NL" },
        { name: "Odisha", type: "State", code: "IN-OR" },
        { name: "Punjab", type: "State", code: "IN-PB" },
        { name: "Rajasthan", type: "State", code: "IN-RJ" },
        { name: "Sikkim", type: "State", code: "IN-SK" },
        { name: "Tamil Nadu", type: "State", code: "IN-TN" },
        { name: "Telangana", type: "State", code: "IN-TG" },
        { name: "Tripura", type: "State", code: "IN-TR" },
        { name: "Uttar Pradesh", type: "State", code: "IN-UP" },
        { name: "Uttarakhand", type: "State", code: "IN-UT" },
        { name: "West Bengal", type: "State", code: "IN-WB" },
        { name: "Andaman and Nicobar Islands", type: "Union Territory", code: "IN-AN" }
    ];


    return (
        <div className="container mt-5 mb-5 p-4 border rounded" style={{ backgroundColor: '#fff' }}>
            <h4 style={{ color: '#000' }}>Delivery Address</h4>

            <BWButton
                variant="contained"
                onClick={useCurrentLocation}
                style={{ marginBottom: '1rem' }}
            >
                Use My Current Location
            </BWButton>
            {geoError && <div className="text-danger mb-3">{geoError}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
                {[
                    ['name', 'Name'],
                    ['mobile', '10-digit mobile number'],
                    ['alternatePhone', "Alternate Phone (Optional)"],
                    ['locality', 'Locality'],
                    ['address', 'Address (Area and Street)'],
                ].map(([field, label], idx) => (
                    <div key={idx} className={field === 'address' ? 'col-md-12' : 'col-md-6'}>
                        <BWMuiTextField
                            fullWidth
                            label={label}
                            variant="outlined"
                            {...register(field)}
                            error={!!errors[field]}
                            helperText={errors[field]?.message}
                        />
                    </div>
                ))}

                <div className={'col-md-6'}>
                    <BWMuiTextField
                        fullWidth
                        label={'Pincode'}
                        variant="outlined"
                        {...register('pincode')}
                        error={!!errors['pincode']}
                        helperText={errors['pincode']?.message}
                    />
                </div>

                <div className="col-md-6">
                    <BWMuiTextField
                        fullWidth
                        label="City/District/Town"
                        defaultValue=''
                        variant="outlined"
                        {...register('city')}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                    >
                    </BWMuiTextField>
                </div>

                <div className="col-md-6">
                    <BWMuiTextField
                        fullWidth
                        select
                        label="State"
                        defaultValue=""
                        variant="outlined"
                        {...register('state')}
                        error={!!errors.state}
                        helperText={errors.state?.message}
                    >

                        {
                            indianStates.length > 0 ?
                                indianStates.map((item, index) =>
                                    <MenuItem value={item.name} key={index}>{item.name}</MenuItem>
                                ) : (<MenuItem value=''>Select State </MenuItem>)
                        }
                        {/* add more */}
                    </BWMuiTextField>
                </div>
                <div className="col-md-6">
                    <BWMuiTextField
                        fullWidth
                        label="Landmark (Optional)"
                        variant="outlined"
                        {...register('landmark')}
                    />
                </div>


                <div className="col-md-12">
                    <FormControl component="fieldset">
                        <FormLabel component="legend" style={{ color: '#000' }}>
                            Address Type
                        </FormLabel>
                        <RadioGroup row defaultValue="Home" {...register('addressType')}>
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
                    </FormControl>
                </div>

                <div className="col-md-12 d-flex gap-3">
                    <BWButton variant="contained" type="submit">
                        Place Order 
                    </BWButton>
                    <Button
                        variant="outlined"
                        style={{
                            borderColor: '#000',
                            color: '#000',
                            backgroundColor: '#fff',
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
