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

    speciality: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Cafe", CafeSchema);