// Artist api calls live in this file

import apiUrl from '../apiConfig'
import axios from 'axios'

// INDEX
export const getAllArtwork = galleryId => {
    return axios(`${apiUrl}/artworks/${galleryId}`)
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
        url: `${apiUrl}/artists/${galleryId}/${updatedArtwork.id}`,
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
        url: `${apiUrl}/artists/${galleryId}/${artworkId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}
