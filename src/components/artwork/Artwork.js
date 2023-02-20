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
    const { artPiece, user, msgAlert, triggerRefresh } = props
    //setting up initial state for EditModal
    const [editArtworkModalShow, setEditArtworkModalShow] = useState(false)

    // the function for deleting artwork from the index
    const removeArtwork = () => {
        //calling api delete func
        deleteArtwork(user, artPiece._id)
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
                        <h2 style={{ padding: '2px' }}>{artPiece.name}</h2>
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

                    <p style={{ padding: '2px' }}>{artPiece.location}</p>
                    <a
                        style={{ padding: '2px' }}
                        src={artPiece.website}
                    >
                        {artPiece.website}
                    </a>
                    <div>
                        <Link
                            to={`/artworks/${artPiece._id}`}
                            className='btn btn-light'
                            style={{ border: '1px solid black', margin: '8px' }}
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
