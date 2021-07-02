const express = require('express')

const StructureCtrl = require('../controllers/structure-ctrl')

const router = express.Router()

router.post('/structure', StructureCtrl.createStructure)
router.put('/structure/:key', StructureCtrl.updateStructure)
router.delete('/structure/:key', StructureCtrl.deleteStructure)
router.get('/structure/:key', StructureCtrl.getStructureByKey)
router.get('/structures', StructureCtrl.getStructures)

module.exports = router