import { useState, useRef, useLayoutEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { updateArtist } from '../../api/artist'
import { Link } from 'react-router-dom'

import EditArtistModal from './EditArtistModal'

const Artist = props => {
    const { person, user, msgAlert, triggerRefresh } = props

    const [editArtistModalShow, setEditArtistModalShow] = useState(false)

    console.log(person)

    return (
        <div>
            <img
                src={person.img}
                alt='artist'
            />
            <FiEdit onClick={() => setEditArtistModalShow(true)} />

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
