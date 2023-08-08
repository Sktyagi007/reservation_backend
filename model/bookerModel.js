const mongoose = require("mongoose");

const bookerSchema = new mongoose.Schema({
    bookerName:{
        type: String,
        required: true
    },
    bookerEmail:{
        type: String,
        required: true,
        unique: true
    },
    bookerPassword:{
        type: String,
        required: true
    },
    bookerPhoneNumber:{
        type: Number,
        required: true
    },
    bookerCompanyName:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("bookers",bookerSchema);


