const router = require('express').Router();
const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const CategoryRouter = require('./CategoryRouter');
const authentication = require("../middlewares/authentication")


router.use('/users', UserRouter);
router.use('/products', ProductRouter);
router.use('/categories', CategoryRouter);

module.exports = router;