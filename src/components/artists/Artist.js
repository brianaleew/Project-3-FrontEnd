import { useState, useRef, useLayoutEffect } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { updateArtist, deleteArtist } from '../../api/artist'
import { Link } from 'react-router-dom'
import { deleteArtistFailure, deleteArtistSuccess } from '../shared/AutoDismissAlert/messages'

import EditArtistModal from './EditArtistModal'

const Artist = props => {
    const { person, user, msgAlert, triggerRefresh } = props

    const [editArtistModalShow, setEditArtistModalShow] = useState(false)

    console.log(person)

    // the function for deleting artists from the index
    const removeArtist = () => {
        //calling api delete func
        deleteArtist(user, person._id)
            //sending success message to user
            .then(() => {
                msgAlert({
                    heading: 'Deletion Success',
                    message: deleteArtistSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh)
            .catch(() => {
                msgAlert({
                    heading: 'Deletion Failed',
                    message: deleteArtistFailure,
                    variant: 'danger'
                })
            })
    }


    return (
        <div>
            <img
                src={person.img}
                alt='artist'
            />
            <FiEdit onClick={() => setEditArtistModalShow(true)} />
            <FiTrash onClick={removeArtist} />

            <p className='***ONLY FOR TESTING***'>{person.owner?.email}</p>

            <p>{person.name}</p>
            <p>{person.location}</p>
            <p>{person.website}</p>
            <Link to={`/artists/${person._id}`} className='btn btn-primary'>Show Artist</Link>
            <EditArtistModal
                user={user}
                artist={person}
                show={editArtistModalShow}
                updateArtist={updateArtist}
                msgAlert={msgAlert}
                handleClose={() => setEditArtistModalShow(false)}
                triggerRefresh={triggerRefresh}
            />
        </div>
    )
}

export default Artist
