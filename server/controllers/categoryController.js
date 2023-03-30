const {categories} = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const dev = await categories.create({name})
            return res.json(dev)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const act = await categories.findAll()
            res.json(act)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const dev = await categories.findOne({where: {id}})
            if (dev==null){
                return next(ApiError.badRequest('Категория не найдена'))
            }
            res.json(dev)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }



    async destroy(req, res, next) {
        try {
            const {id} = req.params
            const dev = await categories.findByPk(id)
            if (dev==null) {
                return next(ApiError.badRequest('Категория не найдена'))
            }
            await dev.destroy()
            res.json(dev)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new CategoryController()