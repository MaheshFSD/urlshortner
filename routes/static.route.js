const express = require('express');
const {getHome, getAllIds, searchId} = require('../controller/url.controller');
const {checkLoggedIn} = require('../middlewares/auth');

const router = express.Router();

router.get('/',checkLoggedIn, getHome);
router.get('/list', getAllIds);
router.get('/find/:id', searchId);
router.get('/signup', (req,res) => res.render('signup'));
router.get('/login', (req,res) => res.render('login'));

module.exports = router;