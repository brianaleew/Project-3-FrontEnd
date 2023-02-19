import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { updateGallery } from '../../api/gallery'
import { Link } from 'react-router-dom'

import EditGalleryModal from './EditGalleryModal'

const Gallery = props => {
    const { gallery, user, msgAlert, triggerRefresh } = props

    const [editGalleryModalShow, setEditGalleryModalShow] = useState(false)

    console.log(gallery)

    return (
        <div>
            <img
                src={gallery.img}
                alt='gallery'
            />
            <FiEdit onClick={() => setEditGalleryModalShow(true)} />

            <p className='***ONLY FOR TESTING***'>{gallery.owner?.email}</p>

            <p>{gallery.name}</p>
            <p>{gallery.description}</p>
            <p>{gallery.location}</p>
            <p>{gallery.img}</p>
            <Link
                to={`/galleries/${gallery._id}`}
                className='btn btn-primary'
            >
                Show Gallery
            </Link>
            <EditGalleryModal
                user={user}
                gallery={gallery}
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
