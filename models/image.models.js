const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    secureUrl: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Image', imageSchema);
