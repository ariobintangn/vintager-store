const ProductController = require('../controllers/ProductController');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();
const {authorization, checkAdmin} = require('../middlewares/authorization')


router.get('/', ProductController.categories);
router.use(authentication)
router.post('/', ProductController.createCategory);
router.delete('/:id', ProductController.deleteCategory);

module.exports = router