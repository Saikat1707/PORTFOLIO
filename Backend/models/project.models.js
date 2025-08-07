const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    githubUrl: {
        type: String,
        required: true,
    },
    linkedinUrl: {
        type: String,
        default:''
    },
    liveUrl: {
        type: String,
        default:''
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
