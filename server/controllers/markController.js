const {marks} = require("../models/models");
const ApiError = require("../error/ApiError");

class MarkController {
    async create(req, res, next) {
        try {
            const {mark, userId} = req.body
            const dev = await marks.create({mark, userId})
            return res.json(dev)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {userId, limit, page} = req.query
            if (!userId) {
                return next(ApiError.badRequest('Укажите пользователя'))
            }
            page = page || 1
            limit = limit || 14
            let offset = page * limit - limit
            let dev;
            dev = await marks.findAndCountAll({where: {userId},limit, offset})
            return res.json(dev)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const dev = await marks.findByPk(id)
            if (dev==null){
                return next(ApiError.badRequest('Оценка не найдена'))
            }
            res.json(dev)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }



    async destroy(req, res, next) {
        try {
            const {id} = req.params
            const dev = await marks.findByPk(id)
            if (dev==null) {
                return next(ApiError.badRequest('Оценка не найдена'))
            }
            await dev.destroy()
            res.json(dev)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new MarkController()