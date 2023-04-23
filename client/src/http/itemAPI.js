import { guestInstance, authInstance } from './index.js'
import jwtDecode from 'jwt-decode'

/* Запросы на создание и получение материалов и оценнок, получение списка категорий (все запросы для авторизованных пользователей)*/

export const createItem = async (item) => {
    const {data} = await authInstance.post('items/create', item)
    return data
}

export const createMark = async (mark) => {
    const {data} = await authInstance.post('marks/create', mark)
    return data
}

export const getItems = async (userId) => {
    const {data} = await authInstance.get(`items/getAll?userId=${userId}`)
    return data
}

export const deleteItem = async (id) => {
    const {data} = await authInstance.delete(`items/destroy/${id}`)
    return data
}

export const updateItem = async (id, item) => {
    const {data} = await authInstance.patch(`items/update/${id}`, item)
    return data
}

export const getCategories = async () => {
    const {data} = await authInstance.get('categories/getAll')
    return data
}

export const getOneCategory = async (id) => {
    const {data} = await authInstance.get(`categories/getOne/${id}`)
    return data
}

export const getMarks = async (userId) => {
    const {data} = await authInstance.get(`marks/getAll?userId=${userId}`)
    console.log(data)
    return data
}
