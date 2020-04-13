const express = require('express');
const router = express.Router();
const { openUrl } = require('../controllers/url');

//opening shortened url route
router.get('/:unique_name', openUrl  );


module.exports = router;