import { guestInstance, authInstance } from './index.js'
import jwtDecode from 'jwt-decode'

/*функции регистрации, авторизации, выхода и проверки токена */
export const signup = async (email, password) => {
    try {
        const response = await guestInstance.post('users/registration', {email, password, role: 'USER'})
        const token = response.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token', token)
        return user
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}

export const login = async (email, password) => {
    try {
        const response = await guestInstance.post('users/login', {email, password})
        const token = response.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token', token)
        return user
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}

export const logout = () => {
    localStorage.removeItem('token')
}

export const check = async () => {
    let userToken, userData
    try {
        let userToken = localStorage.getItem('token')
        // если в хранилище нет действительного токена
        if (!userToken) {
            return false
        }
        // токен есть, надо проверить его подлинность
        const response = await authInstance.get('users/auth')
        userToken = response.data.token
        userData = jwtDecode(userToken)
        localStorage.setItem('token', userToken)
        return userData
    } catch(e) {
        localStorage.removeItem('token')
        return false
    }
}