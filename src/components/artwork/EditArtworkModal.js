//The EditArtistModal is rendered in the ArtistIndex

import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ArtworkForm from '../shared/ArtworkForm'
import {
    updateArtworkFailure,
    updateArtworkSuccess,
} from '../shared/AutoDismissAlert/messages'

const EditArtworkModal = props => {
    //all the props we need
    const {
        artPiece,
        user,
        show,
        updateArtwork,
        handleClose,
        msgAlert,
        triggerRefresh,
    } = props
    //setting initial state of artistInfo
    const [artworkInfo, setArtworkInfo] = useState(artPiece)

    //linking the names and values to what is input by users in the form
    const onChange = e => {
        setArtworkInfo(prevArtwork => {
            e.preventDefault()
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedArtwork = {
                [updatedName]: updatedValue,
            }

            return {
                ...prevArtwork,
                ...updatedArtwork,
            }
        })
    }
    //handling behavior once user submits the editArtistModal
    const onSubmit = e => {
        e.preventDefault()

        updateArtwork(user, artworkInfo)
            //closing modal
            .then(() => handleClose())
            //sending user the success message
            .then(() => {
                msgAlert({
                    heading: 'Nice Edit!',
                    message: updateArtworkSuccess,
                    variant: 'success',
                })
            })
            //refreshing the page to reflect changes
            .then(() => triggerRefresh())
            //handling error with message to user
            .catch(() => {
                msgAlert({
                    heading: 'Oops!',
                    message: updateArtworkFailure,
                    variant: 'danger',
                })
            })
    }

    // console.log('this is artistInfo in the modal', artistInfo._id)

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Body>
                    <ArtworkForm
                        artwork={artworkInfo}
                        handleChange={onChange}
                        handleSubmit={onSubmit}
                        heading='Update Artwork'
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditArtworkModal
