const mongoose = require("mongoose")

const emotion = new mongoose.Schema(
    {
        email: { type: String, required: true },
        metadata: {
            objective: String,
            sentence: String,
            question: String
        },
        result: {
            faceResult: String,
            voiceResult: Number,
            answer: String, 
            topWord: [ String ]
        }

    }, {
        timestamps: true
    }
)

module.exports = mongoose.model("emotion", emotion);