const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 char'],
    },
    price: {
        type: Number,
        requred: [true, 'Please enter product price'],
        maxLength: [5, 'Product name cannot exceed 5 char'],
        default: 0.0
    },
    description: {
        type: String,
        requred: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select a category for this product'],
        enum: {
            values: [
                'Electronics',
                'Camera',
                'Laptops',
                'Accesories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/shoes',
                'Beauty/Healt',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct category for product'
        },
        seller: {
            type: String,
            required: [true, 'Please enter product seller']
        },
        stock: {
            type: Number,
            required: [true, 'Please enter product stock'],
            maxLength: [5, 'Product name cannot exceed 5 char'],
            default: 0
        },
        numOfReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                name: {
                    type: String,
                    required: true
                },
                rating: {
                    type: Number,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                }
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
})

module.exports = mongoose.model('Product', productSchema);