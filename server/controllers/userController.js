const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {users} = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: 60}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'))
            }
            const candidate = await users.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await users.create({email, role, password: hashPassword})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async login(req, res, next){
        try {
            const {email, password} = req.body
            const user = await users.findOne({where: {email}})
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Указан неверный пароль'))
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        res.json({token})
    }
}

module.exports = new UserController()