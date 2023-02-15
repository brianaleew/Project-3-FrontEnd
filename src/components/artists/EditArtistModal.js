import React, { useState } from 'react' 
import { Modal } from 'react-bootstrap'
import ArtistForm from '../shared/ArtistForm'
import messages from '../shared/AutoDismissAlert/messages'

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
            
    }
}