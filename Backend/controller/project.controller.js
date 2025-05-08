const projectModel = require('../models/project.models');
const imageModel = require('../models/image.models');
const { uploadFile } = require('../config/cloudinary.config'); // Import the cloudinary function

// Create Project
const createProject = async (req, res) => {
  try {
    const { title, url, projectDescription } = req.body;
    const localFilePath = req.file?.path; // Use req.file for multer file data

    if (!title || !url || !projectDescription) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!localFilePath) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    const existingProject = await projectModel.findOne({ title });
    if (existingProject) {
      return res.status(400).json({ message: 'Project already exists' });
    }

    // Upload the image to Cloudinary
    const cloudinaryResult = await uploadFile(localFilePath);
    if (!cloudinaryResult) {
      return res.status(400).json({ message: 'Cloudinary upload failed' });
    }

    // Save image data to the image model
    const projectImageData = await imageModel.create({
      originalName: req.file.originalname,
      filePath: localFilePath,
      secureUrl: cloudinaryResult.secure_url, // Cloudinary URL
    });

    if (!projectImageData) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    // Create the project and associate the image
    const project = await projectModel.create({
      title,
      url,
      projectDescription,
      projectImageRefId: projectImageData._id,
    });

    return res.status(200).json({ message: 'Project created successfully', data: project });
  } catch (error) {
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
      if (title) project.title = title;
      if (url) project.url = url;
      if (projectDescription) project.projectDescription = projectDescription;
      if (req.file?.path) {
          if (project.projectImageRefId) {
              const oldImage = await imageModel.findById(project.projectImageRefId);
              if (oldImage) {
                  await imageModel.findByIdAndDelete(project.projectImageRefId);
              }
          }

          const cloudinaryResult = await uploadFile(req.file.path);
          if (!cloudinaryResult) {
              return res.status(400).json({ message: 'Cloudinary upload failed' });
          }

          const newImage = await imageModel.create({
              originalName: req.file.originalname,
              filePath: req.file.path,
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
