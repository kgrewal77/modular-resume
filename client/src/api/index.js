import axios from 'axios'

const api = axios.create({
    baseURL: 'https://us-central1-rezume-eedc0.cloudfunctions.net/server/api',
})

export const insertStructure = payload => api.post(`/structure`, payload)
export const getAllStructures = () => api.get(`/structures`)
export const updateStructureByKey = (key, payload) => api.put(`/structure/${key}`, payload)
export const deleteStructureByKey = key => api.delete(`/structure/${key}`)
export const getStructureByKey = key => api.get(`/structure/${key}`)

const apis = {
    insertStructure,
    getAllStructures,
    updateStructureByKey,
    deleteStructureByKey,
    getStructureByKey,
}

export default apis