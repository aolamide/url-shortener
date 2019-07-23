const express = require('express');
const router = express.Router();
const { openUrl, renderHtml } = require('../controllers/url');

//opening shortened url route
router.get('/:unique_name', openUrl  );

//homepage route
router.get('/', renderHtml );


module.exports = router;