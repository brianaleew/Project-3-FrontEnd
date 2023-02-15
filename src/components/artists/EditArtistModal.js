//The EditArtistModal is rendered in the ArtistIndex

import React, { useState } from 'react' 
import { Modal } from 'react-bootstrap'
import ArtistForm from '../shared/ArtistForm'
import messages, { updateArtistFailure, updateArtistSuccess } from '../shared/AutoDismissAlert/messages'

const EditArtistModal = (props) => {
    //all the props we need 
    const { user, show, handleClose, updateArtist, msgAlert, triggerRefresh } = props 
    
    const [artist, setArtist] = useState(props.artist)

    const onChange = (e) => {
        e.persist()

        setArtist(prevArtist => {
            const updatedName = e.target.name 
            let updatedValue = e.target.value 

            const updatedArtist = {
                [updatedName] : updatedValue
            }

            return {
                ...prevArtist, ...updatedArtist
            }
        })
    }


    const onSubmit = (e) => {
        e.preventDefault()

        updateArtist(user, artist)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Nice Edit!',
                    message: updateArtistSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oops!',
                    message: updateArtistFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
        <Modal show={show} onHide={handleClose}>

            <Modal.Body>
                <ArtistForm
                    artist={artist}
                    handleChange={onChange} 
                    handleSubmit={onSubmit}
                    heading="Update The Artist"
                />
            </Modal.Body>
        </Modal>
        
        
        
        </>
    )
}

export default EditArtistModal