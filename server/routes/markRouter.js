const Router = require('express')
const router = new Router
const markController = require('../controllers/markController')

router.post('/create', markController.create)
router.get('/getAll', markController.getAll)
router.get('/getOne/:id', markController.getOne)
router.delete('/destroy/:id', markController.destroy)

module.exports = router