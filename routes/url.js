const express = require('express');
const router = express.Router();
const { shortenUrl } = require('../controllers/url');

//shorten url route
router.post('/', shortenUrl);

module.exports = router;