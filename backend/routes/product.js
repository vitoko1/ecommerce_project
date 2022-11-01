const express= require('express')
const router = express.Router();
const {getProducts, newProduct, getSingleProduct} = require('../controllers/productControllers');

router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleProduct);
router.route('/products/new').post(newProduct);

module.exports = router;