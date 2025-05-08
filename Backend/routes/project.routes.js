const express = require('express')
const { upload } = require('../config/multer.config')
const router = express.Router()
const projectController = require('../controller/project.controller')

// Create a new project
router.post('/create', upload.single('projectImage'), projectController.createProject)

// Get all projects
router.get('/display', projectController.getAllProjects)

// Delete a project by ID
router.delete('/delete/:id', projectController.deleteProject)

// Update a project by ID
router.put('/update/:id', upload.single('projectImage'), projectController.updateProject)

//get single project
router.get('/display/:id', projectController.getSingleProject)

module.exports = router
