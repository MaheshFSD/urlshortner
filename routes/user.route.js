const express = require('express');
const {handleUserSignup, handleUserLogin} = require('../controller/user.controller');
const { restrictTo, checkForAuthentication } = require('../middlewares/auth');

const router = express.Router();

router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);

module.exports = router;