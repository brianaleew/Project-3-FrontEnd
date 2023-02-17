import { useState} from 'react'
import { FiEdit } from 'react-icons/fi'
import { updateGallery } from '../../api/gallery'
import { Link } from 'react-router-dom'

import EditGalleryModal from './EditGalleryModal'

const Gallery = props => {
    const { person, user, msgAlert, triggerRefresh } = props

    const [editGalleryModalShow, setEditGalleryModalShow] = useState(false)

    console.log(person)

    return (
        <div>
            <img
                src={person.img}
                alt='gallery'
            />
            <FiEdit onClick={() => setEditGalleryModalShow(true)} />

            <p className='***ONLY FOR TESTING***'>{person.owner?.email}</p>

            <p>{person.name}</p>
            <p>{person.description}</p>
            <p>{person.location}</p>
            <p>{person.img}</p>
            <Link to={`/galleries/${person._id}`} className='btn btn-primary'>Show Gallery</Link>
            <EditGalleryModal
                user={user}
                gallery={person}
                show={editGalleryModalShow}
                updateGallery={updateGallery}
                msgAlert={msgAlert}
                handleClose={() => setEditGalleryModalShow(false)}
                triggerRefresh={triggerRefresh}
            />
        </div>
    )
}

export default Gallery
