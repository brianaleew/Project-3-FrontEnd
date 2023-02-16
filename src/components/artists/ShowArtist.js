//this component displays one Artist

import { useState, useEffect } from 'react'
import { useParams, use } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getOneArtist } from '../../api/artist'
import { getArtistsFailure } from '../shared/AutoDismissAlert/messages'

const ShowArtist = (props) => {

    useEffect(() => {
        getOneArtist(id)
            .then(res => setArtist(res.data.artist))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Artist',
                    message: getArtistsFailure,
                    variant: 'danger'
                })
            })
    }, [])



    return(
        <>
        <div>
            <img src={artist.img}  alt='A picture of the artist' />
        </div>

        <div>
            <h3>{artist.name}</h3>
            <h4>{artist.location}</h4>
            <h4>{artist.website}</h4>
            <p>{artist.description}</p>
        </div>
        
        
        
        </>
    )
}

export default ShowArtist