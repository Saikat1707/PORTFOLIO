const express = require('express')
const { upload } = require('../config/multer.config')
const router = express.Router()
const projectController = require('../controller/project.controller')


router.post('/create',upload.single('projectImage'), projectController.createProject)
router.get('/display', projectController.getAllProjects)


module.exports = router