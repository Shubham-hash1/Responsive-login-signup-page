const router = require('express').Router();

const { signup } = require('../Controllers/AuthController');
const { login } = require('../Controllers/AuthController');

const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;