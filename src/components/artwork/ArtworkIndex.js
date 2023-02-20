// This component will serve as an Index of Artists but also give the user the option to edit or delete the artist
import { useState, useEffect } from 'react'
import {
    getAllArtwork,
    createArtwork,
    updateArtwork,
    deleteArtwork,
} from '../../api/artist'
import CreateArtworkModal from './CreateArtistModal'
import Artwork from './Artwork'
import messages from '../shared/AutoDismissAlert/messages'
import { FiEdit, FiTrash, FiPlus } from 'react-icons/fi'

const ArtworkIndex = props => {
    // instead of getting the artwork directly from the back end
    // it will be passed along as a prop from the gallery
    // because it is a sub doc of the gallery
    const { msgAlert, user } = props

    const [artworkArray, setArtworkArray] = useState([])
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [createArtworkModalShow, setCreateArtworkModalShow] = useState(false)

    //making api call
    useEffect(() => {
        getAllArtwork()
            .then(res => {
                // console.log('This is artists', res.data.artists)
                setArtworkArray(res.data.artwork)
            })

            //handle errors by sending user an error message
            .catch(err => {
                msgAlert({
                    heading: 'Error!',
                    message: 'Artwork fail!',
                    variant: 'danger',
                })
                setError(true)
            })
    }, [updated])

    // if there is an error, display the error
    if (error) {
        return <p>Error Ocurred!</p>
    }

    // Once api call gets artwork, iterate through each one and render this style
    const artworkList = artworkArray.map((artPiece, i) => (
        <Artwork
            key={artPiece._id}
            artPiece={artPiece}
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
                <FiPlus onClick={() => setCreateArtworkModalShow(true)} />
            </div>

            <div>{artworkList}</div>

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
            <CreateArtworkModal
                user={user}
                show={createArtworkModalShow}
                msgAlert={msgAlert}
                handleClose={() => setCreateArtworkModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </div>
    )
}

export default ArtworkIndex
