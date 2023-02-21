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
import axios from 'axios'

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

    let objectArr = [
        489544, 752568, 485759, 677116, 446154, 334591, 437125, 849054, 852015,
        852015, 436446, 483419, 853531, 483454, 749639, 58453, 239654, 244695,
        488429, 488880, 437687, 391622, 437392, 391615, 459327,
    ]

    let artUrls = objectArr.map(
        param =>
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${param}`
    )

    // let urls = queryParams.map(
    //     param =>
    //         `https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=${param}`
    // )
    // axios call to pull data from the metropolitan museun public api
    const retrieveArtwork = urls => {
        return Promise.all([urls.map(populateArtwork)])
        //now take the array of objectId's returned in the res and maop over them to push into the artwork subdoc
    }

    const populateArtwork = url => {
        return (
            axios
                .get(url)
                // was trying to access artwork semi-randomly, did not work
                // .then(res => {
                //     let artArr = []
                //     const numberOfDataToPull = 5
                //     const randomIndex = () =>
                //         Math.floor(Math.random() * res.data.total)
                //     for (let i = 0; i < numberOfDataToPull; i++) {
                //         artArr.push(res.data.objectIDs[randomIndex()])
                //     }
                //     console.log('the array of random picks: ', artArr)
                //     artArr.map(a => objectArr.push(a))
                // })
                .then(res => {
                    console.log('zhe datas', res.data)
                    // set the data to state
                    setGallery(prev => ({
                        artworks: [
                            ...prev.artworks,
                            {
                                title: res.data.title,
                                artist: res.data.artistDisplayName,
                                date: res.data.objectEndDate,
                                media: res.data.medium,
                            },
                        ],
                    }))
                })
                .catch(err => {
                    console.log(err)
                })
        )
    }

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

        retrieveArtwork(artUrls)
            .then(() => {
                createGallery(user, gallery)
                    // first we'll nav to the show page
                    .then(res => {
                        console.log('the gallery is: ', gallery)
                        navigate(`/galleries/${res.data.gallery._id}`)
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
            })
            .catch(err => console.log(err))
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
