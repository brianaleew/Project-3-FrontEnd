// This component will serve as an Index of Artists but also give the user the option to edit or delete the artist
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {
    getAllArtists,
    createArtist,
    updateArtist,
    deleteArtist,
} from '../../api/artist'
import CreateArtistModal from './CreateArtistModal'
import Artist from './Artist'
import {
    deleteArtistFailure,
    deleteArtistSuccess,
    getArtistsFailure,
} from '../shared/AutoDismissAlert/messages'
import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi'

const ArtistIndex = props => {
    const { msgAlert, user } = props

    const [artistArray, setArtistArray] = useState([])
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [createArtistModalShow, setCreateArtistModalShow] = useState(false)

    //making api call
    useEffect(() => {
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

    //if there is an error, display the error
    if (error) {
        return <p>Error Ocurred!</p>
    }

    //the function for deleting artists from the index
    // const removeArtist = () => {
    //     //calling api delete func
    //     deleteArtist(user, artist.id)
    //         //sending success message to user
    //         .then(() => {
    //             msgAlert({
    //                 heading: 'Deletion Success',
    //                 message: deleteArtistSuccess,
    //                 variant: 'success'
    //             })
    //         })
    //         .then(() => triggerRefresh())
    //         .catch(() => {
    //             msgAlert({
    //                 heading: 'Deletion Success',
    //                 message: deleteArtistFailure,
    //                 variant: 'danger'
    //             })
    //         })
    // }

    //Once api call gets artists, iterate through each one and render this style

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

    return (
        <div className='main'>
            <div>
                <h3>Total Artists: </h3>
                <FiPlus onClick={() => setCreateArtistModalShow(true)} />
            </div>

            <div>{artistList}</div>

            <div>
                {/* icon btns for edit and delete go here */}
                {/* making modal buttons
            edit modal button
            <Button onClick{() => setEditModalShow(true)}
            > Edit Artist</Button>

            create modal button
            <Button onClick{() => setEditModalShow(true)}
            > Edit Artist</Button>
            */}
            </div>

            {/* importing Modals below...may still need some fine tuning */}
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
