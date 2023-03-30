const Router = require('express')
const router = new Router
const customizedMaterialController = require('../controllers/customizedMaterialController')

router.get('/getAll', customizedMaterialController.getAll)


module.exports = router