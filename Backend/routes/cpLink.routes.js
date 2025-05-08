const express = require('express');
const router = express.Router();
const cpLinkController = require('../controller/cpLink.controller');

router.get('/display' ,cpLinkController.getAllCpLinks)
router.post('/create' ,cpLinkController.createCpLink)
router.delete('/delete/:id' , cpLinkController.deleteCpLink)
router.put('/update/:id' , cpLinkController.updateLink)
router.get('/display/:id' , cpLinkController.getSingleLink)

module.exports = router;