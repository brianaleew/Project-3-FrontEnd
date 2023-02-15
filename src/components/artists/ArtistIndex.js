// This component will serve as an Index of Artists but also give the user the option to edit or delete the artist
import { useState, useEffect } from 'react'
import { getAllArtists } from '../../api/artist'
import messages, { getArtistsFailure } from '../shared/AutoDismissAlert/messages'
import { createArtist, updateArtist, deleteArtist } from '../../api/artist'
import EditArtistModal from './EditArtistModal'
import ArtistForm from '../shared/ArtistForm'





const ArtistIndex = (props) => {

    const [artists, setArtists] = useState(null)
    const [error, setError] = useState(false)
    const { msgAlert } = props
    
    //making api call
    useEffect(() => {
        getAllArtists()
            .then(res => setArtists(res.data.artists))
            //handle errors by sending user an error message
            .catch(err => {
                msgAlert({
                    heading: 'Error!',
                    message: getArtistsFailure,
                    variant: 'danger'
                })
                
            })

    }, [])






    const artistDisplays = artists.map(artist => {
            return (
                // artist div render here
                <div>
                    <img src={artist.img} alt='picture of the artist' />
                    <p>{artist.name}</p>
                    <p>{artist.location}</p>
                    <p>{artist.website}</p>
                </div>
            )
        })






    return(
        <>
        <div>
            <h3>Total Artists: </h3>
            {/* add new artist button here */}    
        </div>


        <div>
            {artistDisplays}
        </div>

        <div>
            {/* icon btns for edit and delete go here */}
        </div>

        </>
    )
}


export default ArtistIndex