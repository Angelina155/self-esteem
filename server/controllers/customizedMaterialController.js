const {customized_materials, materials} = require("../models/models");
const ApiError = require("../error/ApiError");

class CustomizedMaterialController {


    async getAll(req, res, next) {
        try {
            let {userId} = req.query
            if (!userId) {
                return next(ApiError.badRequest('Укажите пользователя'))
            }
            let item;
            item = await customized_materials.findAll({
                where: {userId, state: 'ISSUED'}
            })
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
            const material = await customized_materials.findByPk(req.params.id)

            if (!material) {
                return next(ApiError.badRequest('Материал не найден'))
            }

            const state = req.body.state ?? material.state

            await material.update({state})
            return res.json(material)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }

    }




}

module.exports = new CustomizedMaterialController()