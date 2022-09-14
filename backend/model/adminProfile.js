const mongoose = require("mongoose")

const adminProfile = new mongoose.Schema(
   {
    username: {type: String, required: true},
    password: {type: String, required: true}
   }
)

module.exports = mongoose.model("adminProfile", adminProfile);