const express = require('express');
const router = express.Router();
const {createShortUrl} = require('../controller/url.controller');

router.post('/', createShortUrl);

module.exports = router;