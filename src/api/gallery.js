// this is where our api calls for the gallerys resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllGalleries = () => {
    return axios(`${apiUrl}/galleries`)
}

export const getMyGalleries = user => {
    return axios({
        url: `${apiUrl}/galleries-mine`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}
// READ -> Show
export const getOneGallery = id => {
    return axios(`${apiUrl}/galleries/${id}`)
}

// Create (create a gallery)
export const createGallery = (user, newGallery) => {
    console.log('this is the user', user)
    console.log('this is the newGallery', newGallery)
    return axios({
        url: `${apiUrl}/galleries`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { gallery: newGallery },
    })
}

// Update (update a gallery)
export const updateGallery = (user, updatedGallery) => {
    return axios({
        url: `${apiUrl}/galleries/${updatedGallery._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { gallery: updatedGallery },
    })
}

// Delete (delete a gallery)
export const removeGallery = (user, galleryId) => {
    return axios({
        url: `${apiUrl}/galleries/${galleryId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}
