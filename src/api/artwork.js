// Artist api calls live in this file

import apiUrl from '../apiConfig'
import axios from 'axios'

// INDEX
export const getAllArtwork = (galleryId, user) => {
    return axios({
        url: `${apiUrl}/artworks/${galleryId}/`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}

// SHOW
export const getOneArtwork = (galleryId, artworkId, user) => {
    return axios({
        url: `${apiUrl}/artworks/${galleryId}/${artworkId}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}

// CREATE
export const createArtwork = (user, galleryId, newArtwork) => {
    return axios({
        url: `${apiUrl}/artworks/${galleryId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { artwork: newArtwork },
    })
}

// UPDATE
export const updateArtwork = (user, galleryId, updatedArtwork) => {
    return axios({
        url: `${apiUrl}/artworks/${galleryId}/${updatedArtwork._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { artwork: updatedArtwork },
    })
}

// DELETE
export const deleteArtwork = (user, galleryId, artworkId) => {
    return axios({
        url: `${apiUrl}/artworks/${galleryId}/${artworkId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}
