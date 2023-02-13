const ProductController = require('../controllers/ProductController');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();
const {authorization, checkAdmin} = require('../middlewares/authorization')


router.get('/', ProductController.products);
// router.get('/categories', ProductController.categories);
router.get('/:id', ProductController.productById);
router.use(authentication)
router.post('/', ProductController.createProduct);
router.delete('/:id', ProductController.deleteProduct);
router.put("/:id", checkAdmin, ProductController.updateProduct)
// router.patch("/:id", authorization, ProductController.updateStatus)

module.exports = router