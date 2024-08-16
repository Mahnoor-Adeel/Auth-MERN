const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

console.log('AuthRouter loaded');


router.post('/login', loginValidation, login);

// router.post('/signup', (req, res)=>{
//     res.send('d3f4fg5h7j');
// })
router.post('/signup', signupValidation, signup);

module.exports = router;
