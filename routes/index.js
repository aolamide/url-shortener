const express = require('express');
const router = express.Router();
const { openUrl, getAll } = require('../controllers/url');

//opening shortened url route
router.get('/:unique_name', openUrl  );

//get all 
router.get('/get/urls', getAll);

module.exports = router;