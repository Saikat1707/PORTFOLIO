const express = require('express');
const router = express.Router();
const linkController = require('../controller/link.controller');

router.get('/display',linkController.getAllLinks);
router.put('/update/:id',linkController.getLinkByNameAndUpdate);
router.post('/create',linkController.createLink);
router.delete('/delete/:id',linkController.deleteLink);
router.get('/display/:id',linkController.getSingleLink);
module.exports = router