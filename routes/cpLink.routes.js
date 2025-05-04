const express = require('express');
const router = express.Router();
const cpLinkController = require('../controller/cpLink.controller');

router.get('/display' ,cpLinkController.getAllCpLinks)
router.post('/create' ,cpLinkController.createCpLink)



module.exports = router;