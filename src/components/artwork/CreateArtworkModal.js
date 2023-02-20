// This CreateArtistModal component renders the ArtistForm on the Artist Index Page!
import { useState } from 'react'
import { createArtwork } from '../../api/artwork'
import {
    createArtworkSuccess,
    createArtworkFailure,
} from '../shared/AutoDismissAlert/messages'
import ArtworkForm from '../shared/ArtworkForm'
import { Modal } from 'react-bootstrap'

const CreateArtworkModal = props => {
    //getting props we need
    const { user, show, handleClose, msgAlert, triggerRefresh } = props
    //setting artist initial state
    const [artwork, setArtwork] = useState({
        title: '',
        description: '',
        date: '',
        media: '',
        img: '',
        artist: '',
    })

    //setting up how artists will change once values are input
    const onChange = e => {
        e.persist()
        setArtwork(prevArtwork => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedArtwork = {
                [updatedName]: updatedValue,
            }

            console.log('this is the artwork now', updatedArtwork)

            return {
                ...prevArtwork,
                ...updatedArtwork,
            }
        })
    }
    //setting up behavior for when the Submit button is clicked
    const onSubmit = e => {
        e.preventDefault()

        createArtwork(user, artwork)
            //closing modal and refresh the page to reflect new artwork
            .then(() => handleClose())
            .then(() => triggerRefresh())
            //show the user a successful message alert
            .then(() => {
                msgAlert({
                    heading: 'Nice job!',
                    message: createArtworkSuccess,
                    variant: 'success',
                })
            })
            //if an error occurs, send failure message to user
            .catch(() => {
                msgAlert({
                    heading: 'Uh Oh!',
                    message: createArtworkFailure,
                    variant: 'danger',
                })
            })
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Body>
                <ArtworkForm
                    artwork={artwork}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Add Artwork'
                />
            </Modal.Body>
        </Modal>
    )
}

export default CreateArtworkModal
