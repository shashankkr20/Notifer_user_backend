const express = require('express');
const placeController = require('../controllers/placeController');

const router = express.Router();

// GET /api/places
router.get('/', placeController.getPlaces);

module.exports = router;