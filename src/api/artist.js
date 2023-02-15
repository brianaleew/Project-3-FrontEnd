// Artist api calls live in this file

import apiUrl from '../apiConfig'
import axios from 'axios'

//INDEX 
export const getAllArtists = () => {
    return axios(`${apiUrl}/artists`)
}

//SHOW 
export const getOneArtist = () => {
    return axios(`${apiUrl}/artists/${id}`)
}

//CREATE
export const createArtist = (user, newArtist) => {
    return axios({
        url: `${apiUrl}/artists`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { artist: newArtist}
    })
}

// Update 
export const updateArtist = (user, updatedArtist) => {
    return axios({
        url: `${apiUrl}/artists/${updatedArtist.id}`,
        method: 'PATCH', 
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { artist: updatedArtist}
    })
}

//Delete 
export const deleteArtist = (user, artistId) => {
    return axios({
        url: `${apiUrl}/artists/${artistId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}