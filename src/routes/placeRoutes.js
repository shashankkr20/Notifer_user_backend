const express = require('express');
const placeController = require('../controllers/placeController');

const router = express.Router();

// GET /api/places
router.get('/', placeController.getPlaces);

router.post('/signup', placeController.signup);
router.post('/login', placeController.login);
router.post('/toggle-status', placeController.toggleStatus);
module.exports = router;