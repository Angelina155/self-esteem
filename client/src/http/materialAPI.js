import { guestInstance, authInstance } from './index.js'



/* Запросы на создание, обновление и удаление материалов, получение списка всех материалов*/
export const createMaterial = async (material) => {
    const { data } = await authInstance.post('materials/create', material)
    return data
}

export const updateMaterial = async (id, material) => {
    const { data } = await authInstance.put(`materials/update/${id}`, material)
    return data
}

export const deleteMaterial = async (id) => {
    const { data } = await authInstance.delete(`materials/delete/${id}`)
    return data
}

export const fetchAllMaterials = async () => {
    const { data } = await authInstance.get('materials/getAll')
    return data
}

export const fetchOneMaterial = async (id) => {
    const { data } = await authInstance.get(`materials/getOne/${id}`)
    return data
}

export const fetchAllCustomizedMaterials = async (userId) => {
    const state = 'ISSUED'
    const { data } = await authInstance.get(
        `customized_materials/getAll?userId=${userId}&state=${state}`
        )
    return data
}
