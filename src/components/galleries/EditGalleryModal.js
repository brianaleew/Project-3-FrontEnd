import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import GalleryForm from '../shared/GalleryForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditGallery = (props) => {

    const { gallery, user, show, handleClose, updateGallery, msgAlert, triggerRefresh } = props

    const [galleries, setGalleries] = useState(gallery)

    const onChange = (e) => {
        e.persist()
        
        setGalleries(prevGallery => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'name') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'curator' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'cutrator' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedGallery = {
                [updatedName] : updatedValue
            }
            
            console.log('the gallery', updatedGallery)

            return {
                ...prevGallery, ...updatedGallery
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateGallery(user, galleries)
     
            .then(() => handleClose())
          
            .then(() => {
                msgAlert({
                    heading: 'Gallery Edited!',
                    message: messages.updateGallerySuccess,
                    variant: 'Success'
                })
            })
            

            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Error Editing Gallery!',
                    message: messages.updateGalleryFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <GalleryForm 
                    gallery={galleries} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Gallery"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditGallery