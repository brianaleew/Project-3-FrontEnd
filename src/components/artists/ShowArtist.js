//This component displays one Artist
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneArtist } from '../../api/artist'
import { getArtistsFailure } from '../shared/AutoDismissAlert/messages'

const ShowArtist = (props) => {
    //pulling in props
    const { msgAlert } = props
    //setting initial state for artistInfo
    const [artistInfo, setArtistInfo] = useState({})
    //pulling id for the api request param
    const { id } = useParams()
    console.log('this is id', id)

    useEffect(() => {
        getOneArtist(id)
            //setting ArtistInfo to the data from the api call
            .then(res => setArtistInfo(res.data.artist))
            //giving user an error message if api call fails
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Artist',
                    message: getArtistsFailure,
                    variant: 'danger'
                })
            }) 
    }, [])

    console.log('this is artist info', artistInfo)


    return(
        <>
        <div>
            <img src={artistInfo.img}  alt='A picture of the artist' />
        </div>

        <div>
            <h3>{artistInfo.name}</h3>
            <h4>{artistInfo.location}</h4>
            <h4>{artistInfo.website}</h4>
            <p>{artistInfo.description}</p>
        </div>
        
        
        
        </>
    )
}

export default ShowArtist
