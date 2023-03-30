const Router = require('express')
const router = new Router
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), categoryController.create)
router.get('/getAll', categoryController.getAll)
router.get('/getOne/:id', categoryController.getOne)
router.delete('/destroy/:id', categoryController.destroy)


module.exports = router