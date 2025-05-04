const express = require('express');
const router = express.Router();
const linkController = require('../controller/link.controller');

router.get('/link',linkController.getAllLinks);
router.put('/link/update',linkController.getLinkByNameAndUpdate);
router.post('/link/create',linkController.createLink);

module.exports = router