const mongoose = require('mongoose');
  
const imageSchema = new mongoose.Schema({
    imageBase64: String,
},
{timestamps: true}
);



module.exports = new mongoose.model('imageSchema', imageSchema);