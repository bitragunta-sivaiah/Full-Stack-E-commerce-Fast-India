import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: Array,
        default: [],
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'category',  // Reference to the Category model
        },
    ],
    subCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'subCategory', // Reference to the SubCategory model
        },
    ],
    unit: {
        type: String,
        default: "",
    },
    stock: {
        type: Number,
        default: null,
    },
    price: {
        type: Number,
        default: null,
    },
    discount: {
        type: Number,
        default: null,
    },
    description: {
        type: String,
        default: "",
    },
    more_details: {
        type: Object,
        default: {},
    },
    publish: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

productSchema.index({
    name: 'text',
    description: 'text',
}, {
    weights: {
        name: 10,       // Higher weight for 'name' field
        description: 5, // Lower weight for 'description' field
    },
});

const ProductModel = mongoose.model('product', productSchema);

export default ProductModel;
