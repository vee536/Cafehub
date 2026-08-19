const mongoose = require("mongoose");

const CafeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    event: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        default: 4.5
    }

});

module.exports = mongoose.model("Cafe", CafeSchema);