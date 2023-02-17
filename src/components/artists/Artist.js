import { useState, useRef, useLayoutEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { updateArtist } from '../../api/artist'

import EditArtistModal from './EditArtistModal'

const Artist = props => {
    const { person, user, msgAlert, triggerRefresh } = props

    const [editArtistModalShow, setEditArtistModalShow] = useState(false)

    return (
        <div>
            <img
                src={person.img}
                alt='artist'
            />
            <FiEdit onClick={() => setEditArtistModalShow(true)} />
            <p>{person.name}</p>
            <p>{person.location}</p>
            <p>{person.website}</p>
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
