const {materials, customized_materials} = require("../models/models");
const ApiError = require("../error/ApiError");
const path = require("path");
const uuid = require("uuid")

class MaterialController {
    async create(req, res, next) {
        try {
            const {title, media, info, link, categoryId} = req.body
            const {preview} = req.files
            let filename = uuid.v4() + ".jpg"
            preview.mv(path.resolve(__dirname, '..', 'static', filename))
            const material = await materials.create({title, media, info, preview: filename, link, categoryId})
            return res.json(material)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                return next(ApiError.badRequest('id не найден'))
            }
            const material = await materials.findByPk(req.params.id)

            if (!material) {
                return next(ApiError.badRequest('Материал не найден'))
            }

            const title = req.body.title ?? material.title
            const media = req.body.media ?? material.media
            const info = req.body.info ?? material.info
            const link = req.body.link ?? material.link
            const categoryId = req.body.categoryId ?? material.categoryId

            await material.update({title, media, info, link, categoryId})
            return res.json(material)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        try {
            let {categoryId, limit, page} = req.query
            page = page || 1
            limit = limit || 3
            let offset = page * limit - limit
            let item;
            if (!categoryId){
                item = await materials.findAll()
            }
            if (categoryId){
                item = await materials.findAll({where: {categoryId}})
            }
            return res.json(item)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const material = await materials.findOne({where: {id}})
            if (material==null){
                return next(ApiError.badRequest('Материал не найден'))
            }

            res.json(material)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }



    async destroy(req, res, next) {
        try {
            const {id} = req.params
            const material = await materials.findByPk(id)
            if (material==null) {
                return next(ApiError.badRequest('Материал не найден'))
            }
            await material.destroy()
            res.json(material)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new MaterialController()