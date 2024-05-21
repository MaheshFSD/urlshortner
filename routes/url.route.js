const express = require('express');
const router = express.Router();
const {createShortUrl, reditectUrl, getAnalytics} = require('../controller/url.controller');

router.post('/', createShortUrl);
router.get('/:id', reditectUrl);
router.get('/analytics/:id', getAnalytics)
module.exports = router;