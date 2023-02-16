//The EditArtistModal is rendered in the ArtistIndex

import React, { useState } from 'react' 
import { Modal } from 'react-bootstrap'
import ArtistForm from '../shared/ArtistForm'
// import { updateArtist } from '../../api/artist'
import { updateArtistFailure, updateArtistSuccess } from '../shared/AutoDismissAlert/messages'

const EditArtistModal = (props) => {
    //all the props we need 
    const { user, show, artist, updateArtist, handleClose, msgAlert, triggerRefresh } = props 
    
    const [artistInfo, setArtistInfo] = useState(props.artist)
    //linking names and values to what is input by users in form
    const onChange = (e) => {
        e.persist()

        setArtistInfo(prevArtist => {
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

        updateArtist(user, artistInfo)
            //closing modal
            .then(() => handleClose()) 
            //sending user the success message
            .then(() => {
                msgAlert({
                    heading: 'Nice Edit!',
                    message: updateArtistSuccess,
                    variant: 'success'
                })
            })
            //refreshing 
            .then(() => triggerRefresh())
            //handling error with message to user
            .catch(() => {
                msgAlert({
                    heading: 'Oops!',
                    message: updateArtistFailure,
                    variant: 'danger'
                })
            })
    }

    console.log('this is artistInfo', artistInfo._id)
    return (
        <>
        <Modal show={show} onHide={handleClose}>

            <Modal.Body>
                <ArtistForm
                    artist={artistInfo}
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