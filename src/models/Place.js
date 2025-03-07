const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userid:{type:String,required:true,unique:true},
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  password:{type:String ,required: true},
  status: { type: String, enum: ['open', 'closed'], default: 'closed' },
});

module.exports = mongoose.model('Place', placeSchema);