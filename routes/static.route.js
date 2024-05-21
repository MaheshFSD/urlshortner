const express = require('express');
const {getHome, getAllIds} = require('../controller/url.controller');

const router = express.Router();

router.get('/', getHome);
router.get('/list', getAllIds);

module.exports = router;