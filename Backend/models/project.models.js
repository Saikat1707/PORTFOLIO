const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
    projectImageRefId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});

module.exports = mongoose.model('Project', projectSchema);
