const projectModel = require('../models/project.models');
const imageModel = require('../models/image.models');



const createProject = async (req , res) =>{

    const {projectTitle, projectLink, projectDescription} = req.body
    const localFilePath = req.projectImage?.path

    if(!projectTitle || !projectLink || !projectDescription) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if(!localFilePath) {
        return res.status(400).json({ message: 'Image upload failed' });
    }
    
    const projectImageData = imageModel.create({
        originalName: req.projectImage.originalname,
        filePath: localFilePath,
        secureUrl: req.projectImage.secure_url,
    })
    if(!projectImageData) {
        return res.status(400).json({ message: 'Image upload failed' });
    }
    const projectImageRefId = projectImageData._id

    const projectData = projectModel.create({
        projectTitle,
        projectLink,
        projectDescription,
        projectImageRefId
    })
}

const getAllProjects = async (req , res) =>{
    const projects = await projectModel.find().populate('projectImageRefId')
    if(!projects) {
        return res.status(400).json({ message: 'No projects found' });
    }
    return res.status(200).json({ message: 'Projects fetched successfully', data: projects });

}

module.exports = {createProject, getAllProjects}