const express = require('express');
const router = express.Router();
const {createShortUrl, reditectUrl} = require('../controller/url.controller');

router.post('/', createShortUrl);
router.get('/:id', reditectUrl);
module.exports = router;