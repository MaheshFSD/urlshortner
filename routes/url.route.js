const express = require('express');
const router = express.Router();
const {createShortUrl, reditectUrl, getAnalytics, staticRoute} = require('../controller/url.controller');
const {checkLoggedIn, checkForAuthentication, restrictTo} = require('../middlewares/auth');

router.post('/', createShortUrl);
router.get('/:id', reditectUrl);
router.get('/analytics/:id', getAnalytics)
module.exports = router;