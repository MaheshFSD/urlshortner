const express = require('express');
const {getHome, getAllIds, searchId} = require('../controller/url.controller');

const router = express.Router();

router.get('/', getHome);
router.get('/list', getAllIds);
router.get('/find/:id', searchId);

module.exports = router;