const mongoose = require('mongoose');

const cpLinkSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('CpLink', cpLinkSchema)