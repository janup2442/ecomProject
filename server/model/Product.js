import mongoose from "mongoose";
import {User} from './User.js';

// Subcategory Schema
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
        unique: true
    }
}, { _id: false }); 

// Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
        unique: true
    },
    subcategories: [subcategorySchema]
}, { timestamps: true });

// Product review schema 
const productReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    name:String,
    rating:{
        type:Number,
        max : 5
    },
    description:String
},{timestamps:true});

// Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    category: {
        type:String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        default: []
    },
    SKU: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: {
        type: [String],
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    brand: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive','archieve','published','draft'],
        default: 'active'
    },
    dimension:{
        type:[Number],
        default:[],
    },
    weight:{
        type:Number,
        default:0
    },
    rating:{
        type:[Number],
        default:[0,0,0,0,0]
    },
    review:{
        type:[productReviewSchema]
    },
    discountType:{
        type:Number,
        default:0
    },
    discountValue:{
        type:Number,
        default:0
    },
    colorVariants:{
        type:[String],
        default:[]
    }
    
}, { timestamps: true });

// Custom validator for images array length
function arrayLimit(val) {
    return val.length <= 4;
}

// Transform output (toJSON)
productSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

categorySchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});


const Product = mongoose.model('Product',productSchema);
const Category  = mongoose.model('category',categorySchema);
const productReview = mongoose.model('review',productReviewSchema)

export {Product , Category,productReview} ;