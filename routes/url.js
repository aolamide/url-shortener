const express = require('express');
const router = express.Router();
const { shortenUrl, openUrl } = require('../controllers/url');

router.get('/:unique_name', openUrl  );
router.post('/new', shortenUrl);

module.exports = router;