//The EditArtistModal is rendered in the ArtistIndex

import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import ArtistForm from '../shared/ArtistForm'
import { updateArtistFailure, updateArtistSuccess } from '../shared/AutoDismissAlert/messages'

const EditArtistModal = props => {
    //all the props we need
    const {
        artist,
        user,
        show,
        updateArtist,
        handleClose,
        msgAlert,
        triggerRefresh,
    } = props
    //setting initial state of artistInfo 
    const [artistInfo, setArtistInfo] = useState(artist)

    //linking the names and values to what is input by users in the form
    const onChange = e => {
        setArtistInfo(prevArtist => {
            e.preventDefault()
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedArtist = {
                [updatedName]: updatedValue,
            }

            return {
                ...prevArtist,
                ...updatedArtist,
            }
        })
    }
    //handling behavior once user submits the editArtistModal
    const onSubmit = e => {
        e.preventDefault()

        updateArtist(user, artistInfo)
            //closing modal
            .then(() => handleClose())
            //sending user the success message
            .then(() => {
                msgAlert({
                    heading: 'Nice Edit!',
                    message: updateArtistSuccess,
                    variant: 'success',
                })
            })
            //refreshing the page to reflect changes
            .then(() => triggerRefresh())
            //handling error with message to user
            .catch(() => {
                msgAlert({
                    heading: 'Oops!',
                    message: updateArtistFailure,
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
                    <ArtistForm
                        artist={artistInfo}
                        handleChange={onChange}
                        handleSubmit={onSubmit}
                        heading='Update The Artist'
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditArtistModal
