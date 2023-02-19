//This Artist component controls how artists are rendered in the artist index and holds the function for deleting artists 
import { useState } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { updateArtist, deleteArtist } from '../../api/artist'
import { Link } from 'react-router-dom'
import { deleteArtistFailure, deleteArtistSuccess } from '../shared/AutoDismissAlert/messages'
import EditArtistModal from './EditArtistModal'
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
            <div className='index-container'>
                <div>
                    <img className='index-img'
                        src={person.img}
                        alt='artist'
                    />
                </div>
                

                {/* <p className='***ONLY FOR TESTING***'>{person.owner?.email}</p> */}
                <div className='index-container-info' >
                    <div className='title-container'>
                    <h2 style={{padding: '2px'}}>{person.name}</h2>
                    <div className='index-icons'>
                <FiEdit size='1.5rem' onClick={() => setEditArtistModalShow(true)} />
                <FiTrash size='1.5rem' onClick={removeArtist} />
                    </div>
                </div>

                    <p style={{padding: '2px'}}>{person.location}</p>
                    <a  style={{padding: '2px'}}src={person.website}>{person.website}</a>
                   <div><Link to={`/artists/${person._id}`} className='btn btn-light' style={{border: '1px solid black', margin: '8px'}}>Show Artist</Link></div> 
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
