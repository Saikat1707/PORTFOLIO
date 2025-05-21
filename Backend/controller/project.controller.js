const projectModel = require('../models/project.models');
const imageModel = require('../models/image.models');
// const { uploadFile } = require('../config/cloudinary.config'); // Import the cloudinary function
const { uploadFileFromBuffer } = require('../config/cloudinary.config');

//create project 

const createProject = async (req, res) => {
  try {
    const { title, url, projectDescription } = req.body;

    if (!title || !url || !projectDescription) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Image upload failed: No file buffer found' });
    }

    // Check for existing project
    const existingProject = await projectModel.findOne({ title });
    if (existingProject) {
      return res.status(400).json({ message: 'Project already exists' });
    }

    // Upload the image to Cloudinary from buffer
    const cloudinaryResult = await uploadFileFromBuffer(req.file.buffer);
    if (!cloudinaryResult) {
      return res.status(400).json({ message: 'Cloudinary upload failed' });
    }

    // Save image reference in DB
    const projectImageData = await imageModel.create({
      originalName: req.file.originalname,
      filePath: 'Uploaded via memory buffer',
      secureUrl: cloudinaryResult.secure_url,
    });

    // Create project with image ref
    const project = await projectModel.create({
      title,
      url,
      projectDescription,
      projectImageRefId: projectImageData._id,
    });

    return res.status(200).json({ message: 'Project created successfully', data: project });
  } catch (error) {
    console.error('Create Project Error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Get All Projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.find().populate('projectImageRefId');
        if (!projects) {
            return res.status(404).json({ message: 'No projects found' });
        }
        return res.status(200).json({ message: 'Projects fetched successfully', data: projects });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Project
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params.id;

        const project = await projectModel.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Delete associated image
        await imageModel.findByIdAndDelete(project.projectImageRefId);

        // Delete the project
        await projectModel.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, projectDescription } = req.body;

    const project = await projectModel.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update text fields
    if (title) project.title = title;
    if (url) project.url = url;
    if (projectDescription) project.projectDescription = projectDescription;

    // If a new image is uploaded
    if (req.file && req.file.buffer) {
      // Delete old image if exists
      if (project.projectImageRefId) {
        await imageModel.findByIdAndDelete(project.projectImageRefId);
      }

      // Upload new image to Cloudinary
      const cloudinaryResult = await uploadFileFromBuffer(req.file.buffer);
      if (!cloudinaryResult) {
        return res.status(400).json({ message: 'Cloudinary upload failed' });
      }

      // Save new image reference
      const newImage = await imageModel.create({
        originalName: req.file.originalname,
        filePath: 'Uploaded via memory buffer',
        secureUrl: cloudinaryResult.secure_url,
      });

      project.projectImageRefId = newImage._id;
    }

    await project.save();

    return res.status(200).json({ message: 'Project updated successfully', data: project });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSingleProject = async (req , res)=>{
  const id = req.params.id;
  if(!id) return res.status(400).json({message:'Id is required'});

  const projectData = await projectModel.findById(id).populate('projectImageRefId');;
  if(!projectData) return res.status(404).json({message:'Project not found'});
  return res.status(200).json({message:'fetched successfully',data:projectData});

}

module.exports = {
    createProject,
    getAllProjects,
    deleteProject,
    updateProject,
    getSingleProject
};
