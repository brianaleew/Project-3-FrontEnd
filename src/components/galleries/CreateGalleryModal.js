// CreateGallery needs to render a form
// that form should build a gallery object in state
// the form should make an axios post request when submitted
// we should send an alert upon success or failure
// on success: component should redirect our user to the new gallery show page
// on failure: component should send the message and remain visible
import { useState } from 'react'
import { createGallery } from '../../api/gallery'
import {
    createGallerySuccess,
    createGalleryFailure,
} from '../shared/AutoDismissAlert/messages'
import GalleryForm from '../shared/GalleryForm'
import { Modal } from 'react-bootstrap'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateGalleryModal = props => {
    // pull out our props
    const { user, msgAlert, show, handleClose } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    // console.log('this is navigate', navigate)

    const [gallery, setGallery] = useState({
        name: '',
        description: '',
        location: '',
        img: '',
        curators: false,
        artworks: [],
    })

    const onChange = e => {
        e.persist()

        setGallery(prevGallery => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // console.log('this is the input type', e.target.type)

            // to handle a number, we look at the type, and parse a string to an integer
            if (e.target.type === 'string') {
                updatedValue = parseInt(e.target.value)
            }

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'curator' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'curator' && !e.target.checked) {
                updatedValue = false
            }

            const updatedGallery = {
                [updatedName]: updatedValue,
            }

            console.log('the gallery', updatedGallery)

            return {
                ...prevGallery,
                ...updatedGallery,
            }
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        createGallery(user, gallery)
            // first we'll nav to the show page
            .then(res => {
                navigate(`/gallerys/${res.data.gallery.id}`)
            })
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createGallerySuccess,
                    variant: 'success',
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createGalleryFailure,
                    variant: 'danger',
                })
            })
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <GalleryForm
                    gallery={gallery}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Add a new gallery!'
                />
            </Modal.Body>
        </Modal>
    )
}

export default CreateGalleryModal
