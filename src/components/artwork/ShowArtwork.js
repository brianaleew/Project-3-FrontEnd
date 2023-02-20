//This component displays one Artist
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneArtwork } from '../../api/artwork'
import { getArtworkFailure } from '../shared/AutoDismissAlert/messages'
import '../../index.css'

const ShowArtwork = props => {
    //pulling in props
    const { msgAlert } = props
    //setting initial state for artistInfo
    const [artworkInfo, setArtworkInfo] = useState({})
    //pulling id for the api request param
    const { id } = useParams()
    console.log('this is id', id)

    useEffect(() => {
        getOneArtwork(id)
            //setting ArtistInfo to the data from the api call
            .then(res => setArtworkInfo(res.data.artwork))
            //giving user an error message if api call fails
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Artist',
                    message: getArtworkFailure,
                    variant: 'danger',
                })
            })
    }, [])

    // console.log('this is artwork info', artworkInfo)

    return (
        <div className='gh-flex-clm-c'>
            <div>
                <img
                    style={{ width: '100%' }}
                    src={artworkInfo.img}
                    alt='A picture of the artist'
                />
            </div>

            <div className='show-info'>
                <h3 className='show-items'>{artworkInfo.title}</h3>
                <h5 className='show-items'>{artworkInfo.artist}</h5>
                <p className='show-items'>{artworkInfo.date}</p>
                <p className='show-items'>{artworkInfo.media}</p>
                <p className='show-items'>{artworkInfo.description}</p>
            </div>
        </div>
    )
}

export default ShowArtwork
