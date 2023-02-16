// This CreateArtist Component renders the ArtistForm

import { useState } from 'react'
import { createArtist } from '../../api/artist'
import { createArtistSuccess, createArtistFailure } from '../shared/AutoDismissAlert/messages'
import ArtistForm from '../shared/ArtistForm'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

const CreateArtistModal = (props) => {
    //getting props we need
    const { user, show, handleClose, createArtist, msgAlert, triggerRefresh } = props 

    //pulling the navigation func 
    const navigate = useNavigate()
    //setting artist initial state
    const [artist, setArtist] = useState({
        name: '',
        description: '',
        location: '',
        website: ''
    })
    
    const onChange = (e) => {
        e.persist()
        
        //setting up how artists will change once values are input
        setArtist(prevArtist => {
            const updatedName = e.target.name 
            let updatedValue = e.target.value

            const updatedArtist = {
                [updatedName] : updatedValue 
            }

            console.log('this is the artist now', updatedArtist)

            return {
                ...prevArtist, ...updatedArtist
            }
    })
    //setting up behavior for when the Submit button is clicked
    const onSubmit = (e) => {
        e.preventDefault()

        createArtist(user, artist)
            //navigate the user to the artist show page
            .then(res => { navigate(`/artists/${res.data.artist.id}`)})
            //show the user a successful message alert
            .then(() => {
                msgAlert({
                    heading: 'Nice job!',
                    message: createArtistSuccess,
                    variant: 'success'
                })
            })
            //if an error occurs, send failure message to user
            .catch(() => {
                msgAlert({
                    heading: 'Uh Oh!',
                    message: createArtistFailure,
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
                    heading="Add A New Artist"
                />
            </Modal.Body>
        </Modal>
        </>
    )
  }
}

export default CreateArtistModal