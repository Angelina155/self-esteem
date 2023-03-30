const Router = require('express')
const router = new Router
const userRouter = require('./userRouter')
const materialRouter = require('./materialRouter')
const markRouter = require('./markRouter')
const itemRouter = require('./itemRouter')
const customizedMaterialRouter = require('./customizedMaterialRouter')
const categoryRouter = require('./categoryRouter')

router.use('/users', userRouter)
router.use('/materials', materialRouter)
router.use('/marks', markRouter)
router.use('/items', itemRouter)
router.use('/customized_materials', customizedMaterialRouter)
router.use('/categories', categoryRouter)

module.exports = router