import { useState } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { updateArtwork, deleteArtwork } from '../../api/artwork'
import { Link } from 'react-router-dom'
import {
    deleteArtworkFailure,
    deleteArtworkSuccess,
} from '../shared/AutoDismissAlert/messages'
import EditArtworkModal from './EditArtworkModal'
import '../../index.css'

const Artwork = props => {
    //pulling in the props we need
    const { artPiece, user, msgAlert, triggerRefresh, galleryId } = props
    //setting up initial state for EditModal
    const [editArtworkModalShow, setEditArtworkModalShow] = useState(false)

    // the function for deleting artwork from the index
    const removeArtwork = () => {
        //calling api delete func
        deleteArtwork(user, galleryId, artPiece._id)
            .then(() => triggerRefresh())
            //sending success message to user
            .then(() => {
                msgAlert({
                    heading: 'Deletion Success',
                    message: deleteArtworkSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Deletion Failed',
                    message: deleteArtworkFailure,
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
                        src={artPiece.img}
                        alt='piece of art'
                    />
                </div>

                {/* <p className='***ONLY FOR TESTING***'>{person.owner?.email}</p> */}
                <div className='index-container-info'>
                    <div className='title-container'>
                        <h2 style={{ padding: '2px' }}>{artPiece.title}</h2>
                        <div className='index-icons'>
                            <FiEdit
                                size='1.5rem'
                                onClick={() => setEditArtworkModalShow(true)}
                            />
                            <FiTrash
                                size='1.5rem'
                                onClick={removeArtwork}
                            />
                        </div>
                    </div>

                    <p style={{ padding: '2px' }}>{artPiece.artist}</p>
                    <p style={{ padding: '2px' }}>{artPiece.date}</p>
                    <p style={{ padding: '2px' }}>{artPiece.media}</p>
                    <div>
                        <Link
                            to={`/artworks/${galleryId}/${artPiece._id}`}
                            className='gh-btn'
                        >
                            Show Art
                        </Link>
                    </div>
                </div>

                <EditArtworkModal
                    user={user}
                    artPiece={artPiece}
                    show={editArtworkModalShow}
                    updateArtwork={updateArtwork}
                    msgAlert={msgAlert}
                    handleClose={() => setEditArtworkModalShow(false)}
                    triggerRefresh={triggerRefresh}
                />
            </div>
        </div>
    )
}

export default Artwork
