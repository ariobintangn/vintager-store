const UserController = require('../controllers/UserController');
const router = require('express').Router();

router.get('/', UserController.users)
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router
