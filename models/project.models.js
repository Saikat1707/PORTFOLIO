const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true,
    },
    projectLink: {
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
