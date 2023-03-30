const {items, materials} = require("../models/models");
const ApiError = require("../error/ApiError");

class ItemController {
    async create(req, res, next) {
        try {
            const {title, a, b, c, b1, c1, state_before,
                state_after, timer, categoryId, userId} = req.body
            const item = await items.create({title, a, b, c, b1, c1, state_before,
                state_after, timer, categoryId, userId})
            return res.json(item)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                return next(ApiError.badRequest('id не найден'))
            }
            const item = await items.findByPk(req.params.id)

            if (!item) {
                return next(ApiError.badRequest('Запись не найдена'))
            }

            const title = req.body.title ?? item.title
            const a = req.body.a ?? item.a
            const b = req.body.b ?? item.b
            const c = req.body.c ?? item.c
            const b1 = req.body.b1 ?? item.b1
            const c1 = req.body.c1 ?? item.c1
            const state_before = req.body.state_before ?? item.state_before
            const state_after = req.body.state_after ?? item.state_after
            const timer = req.body.timer ?? item.timer
            const categoryId = req.body.categoryId ?? item.categoryId
            const userId = req.body.userId ?? item.userId

            await item.update({title, a, b, c, b1, c1, state_before,
                state_after, timer, categoryId, userId})
            return res.json(item)
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
            let item;
            item = await items.findAndCountAll({where: {userId},limit, offset})
            return res.json(item)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const item = await items.findByPk(id)
            if (item==null){
                return next(ApiError.badRequest('Запись не найдена'))
            }
            res.json(item)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }



    async destroy(req, res, next) {
        try {
            const {id} = req.params
            const item = await items.findByPk(id)
            if (item==null) {
                return next(ApiError.badRequest('Запись не найдена'))
            }
            await item.destroy()
            res.json(item)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new ItemController()