//This Artist component controls how artists are rendered in the artist index and holds the function for deleting artists 
import { useState } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { updateArtist, deleteArtist } from '../../api/artist'
import { Link } from 'react-router-dom'
import { deleteArtistFailure, deleteArtistSuccess } from '../shared/AutoDismissAlert/messages'
import EditArtistModal from './EditArtistModal'
import './Artists.css'
import '../../index.css'







const Artist = props => {
    //pulling in the props we need
    const { person, user, msgAlert, triggerRefresh } = props
    //setting up initial state for EditModal
    const [editArtistModalShow, setEditArtistModalShow] = useState(false)

    // the function for deleting artists from the index
    const removeArtist = () => {
        //calling api delete func
        deleteArtist(user, person._id)
            .then(() => triggerRefresh())
            //sending success message to user
            .then(() => {
                msgAlert({
                    heading: 'Deletion Success',
                    message: deleteArtistSuccess,
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Deletion Failed',
                    message: deleteArtistFailure,
                    variant: 'danger'
                })
            })
    }

    

    return (
        <div className='main'>
            <div className='artist-index-container'>
                <div>
                    <img className='artist-index-img'
                        src={person.img}
                        alt='artist'
                    />
                </div>
                

                {/* <p className='***ONLY FOR TESTING***'>{person.owner?.email}</p> */}
                <div className='artist-index-container-info' >
                    <h2>{person.name}</h2>
                    <p>{person.location}</p>
                    <a src={person.website}>Artist Portfolio Website</a>
                    <Link to={`/artists/${person._id}`} className='btn btn-primary'>Show Artist</Link>
                </div>

                <div className='artist-index-icons'>
                <FiEdit size='1.5rem' onClick={() => setEditArtistModalShow(true)} value={{ className: 'artist-index-icons' }} />
                <FiTrash size='1.5rem' onClick={removeArtist} value={{ className: 'artist-index-icons' }} />
                </div>



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
        </div>
    )
}

export default Artist
