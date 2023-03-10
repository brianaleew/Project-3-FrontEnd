// This component will serve as an Index of Artists but also give the user the option to edit or delete the artist
import { useState, useEffect } from 'react'
import { getAllArtists } from '../../api/artist'
import CreateArtistModal from './CreateArtistModal'
import Artist from './Artist'
import { getArtistsFailure } from '../shared/AutoDismissAlert/messages'
import { FiPlus } from 'react-icons/fi'
import '../../index.css'


const ArtistIndex = props => {
    //pulling in props
    const { msgAlert, user } = props
    //setting up initial state array of artists
    const [artistArray, setArtistArray] = useState([])
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [createArtistModalShow, setCreateArtistModalShow] = useState(false)
    // console.log('this is updated', updated)

    useEffect(() => {
        //making api call for artists
        getAllArtists()
            .then(res => {
                // console.log('This is artists', res.data.artists)
                setArtistArray(res.data.artists)
            })

            //handle errors by sending user an error message
            .catch(err => {
                msgAlert({
                    heading: 'Error!',
                    message: getArtistsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [updated])

    //if there is an error, display error on page
    if (error) {
        return <p>Error Ocurred!</p>
    }

    //Once we have artists from api call, map through the array of artists and apply the  design from the Artist component
    const artistList = artistArray.map((person, i) => (
        <Artist
            key={person._id}
            person={person}
            user={user}
            msgAlert={msgAlert}
            triggerRefresh={() => setUpdated(prev => !prev)}
        />
    ))
    // console.log('This is the artist array', artistArray)

    //Counter for Artists
     let artistTotal = artistArray.length 


    return (
        <div className='main gh-main-container'>
            <div className='index-head'>
                <h3>Total Artists: {artistTotal} </h3>
               
                <span style={{display: 'flex'}}>
                    <h5 style={{padding: '0 1rem 0 0'}}>Add New</h5>
                    <FiPlus size='2rem' onClick={() => setCreateArtistModalShow(true)} />
                </span>
            </div>

            <div>{artistList}</div>

            <CreateArtistModal
                user={user}
                show={createArtistModalShow}
                msgAlert={msgAlert}
                handleClose={() => setCreateArtistModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </div>
    )
}

export default ArtistIndex
