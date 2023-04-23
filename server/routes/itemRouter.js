const Router = require('express')
const router = new Router
const itemController = require('../controllers/itemController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create', itemController.create)
router.get('/getAll', itemController.getAll)
router.get('/getOne/:id', itemController.getOne)
router.delete('/destroy/:id', itemController.destroy)
router.patch('/update/:id', itemController.update)


module.exports = router