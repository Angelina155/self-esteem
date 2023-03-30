const Router = require('express')
const router = new Router
const materialController = require('../controllers/materialController')

router.post('/create', materialController.create)
router.put('/update/:id', materialController.update)
router.get('/getAll', materialController.getAll)
router.get('/getOne/:id', materialController.getOne)
router.delete('/destroy/:id', materialController.destroy)


module.exports = router