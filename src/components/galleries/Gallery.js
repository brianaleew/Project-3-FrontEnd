import { useState } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { updateGallery, removeGallery } from '../../api/gallery'
import { Link } from 'react-router-dom'
import '../../index.css'
import {
    removeGalleryFailure,
    removeGallerySuccess,
} from '../shared/AutoDismissAlert/messages'
import EditGalleryModal from './EditGalleryModal'

const Gallery = props => {
    const { gallery, user, msgAlert, triggerRefresh } = props

    const [editGalleryModalShow, setEditGalleryModalShow] = useState(false)

    // console.log(gallery)

    // the function for deleting galleries from the Curator index
    const deleteGallery = () => {
        //calling api delete func
        removeGallery(user, gallery._id)
            .then(() => triggerRefresh())
            //sending success message to user
            .then(() => {
                msgAlert({
                    heading: 'Deletion Success',
                    message: removeGallerySuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Deletion Failed',
                    message: removeGalleryFailure,
                    variant: 'danger',
                })
            })
    }

    return (
        <div className='main'>
            <div className='index-container'>
                <div>
                    <img
                        className='index-img'
                        src={gallery.img}
                        alt='gallery'
                    />
                </div>

                {/* <p className='***ONLY FOR TESTING***'>{gallery.owner?.email}</p> */}
                <div className='index-container-info'>
                    <div className='title-container'>
                        <h2 style={{ padding: '2px' }}>{gallery.name}</h2>
                        <div className='index-icons'>
                            <FiEdit
                                size='1.5rem'
                                onClick={() => setEditGalleryModalShow(true)}
                            />
                            {/* <FiTrash size='1.5rem' onClick={inserted the gallery delete function here} /> */}
                            <FiTrash
                                size='1.5rem'
                                onClick={deleteGallery}
                            />
                        </div>
                    </div>
                    <p style={{ padding: '2px' }}>{gallery.location}</p>
                    <p style={{ padding: '2px' }}>{gallery.description}</p>
                    <div>
                        <Link
                            to={`/galleries/${gallery._id}`}
                            className='gh-btn'
                        >
                            {' '}
                            Show Gallery{' '}
                        </Link>
                    </div>
                </div>

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
        </div>
    )
}

export default Gallery
