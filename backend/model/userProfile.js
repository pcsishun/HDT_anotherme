const mongoose = require("mongoose")

const userProfile = new mongoose.Schema(
    {
        contact: {
            email: { type: String, required: true },
            username: { type: String, required: true },
            mobile: { type: String, required: true }  
        },
        info: {
            sex: String,
            maritalStatus: String,
            occupation: String,
            interest: String
        },
        isFirstTime:{ type: Boolean, required: true},
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model("userProfile", userProfile);