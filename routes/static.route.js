const express = require('express');
const {getHome} = require('../controller/url.controller');

const router = express.Router();

router.get('/', getHome);

module.exports = router;