const Place = require('../models/Place');

// Fetch all places
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching places', error });
  }
};