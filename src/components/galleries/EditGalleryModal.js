<<<<<<< HEAD
=======
// this modal is rendered by ShowPet
// The state that controls whether this is open or not live in ShowPet
// the state and the updaterfunction associated with that state is passed here as a prop.
>>>>>>> 3e3e642 (GalleryEdit page ready)
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import GalleryForm from '../shared/GalleryForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditGallery = (props) => {

    const { user, show, handleClose, updateGallery, msgAlert, triggerRefresh } = props

<<<<<<< HEAD
    const [gallery, setGallery] = useState(props.gallery)
=======
    const [gallery, setGalley] = useState(props.gallery)
>>>>>>> 3e3e642 (GalleryEdit page ready)

    const onChange = (e) => {
        e.persist()
        
<<<<<<< HEAD
        setGallery(prevGallery => {
=======
        setGalley(prevGallery => {
>>>>>>> 3e3e642 (GalleryEdit page ready)
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'name') {
                updatedValue = parseInt(e.target.value)
            }

<<<<<<< HEAD
            // if (updatedName === 'curator' && e.target.checked) {
            //     updatedValue = true
            // } else if (updatedName === 'cutrator' && !e.target.checked) {
            //     updatedValue = false
            // }
=======
            if (updatedName === 'curator' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'cutrator' && !e.target.checked) {
                updatedValue = false
            }
>>>>>>> 3e3e642 (GalleryEdit page ready)
            
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

        updateGallery(user, gallery)
          
            .then(() => handleClose())
<<<<<<< HEAD
            
            .then(() => {
                msgAlert({
                    heading: 'Gallery is Edited!',
=======
          
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
>>>>>>> 3e3e642 (GalleryEdit page ready)
                    message: messages.updateGallerySuccess,
                    variant: 'success'
                })
            })
            

            .then(() => triggerRefresh())
<<<<<<< HEAD
       
=======
            // if there is an error, tell the user about it
>>>>>>> 3e3e642 (GalleryEdit page ready)
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
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
                    gallery={gallery} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Gallery"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditGallery