// This component will serve as an Index of Artists but also give the user the option to edit or delete the artist
import { useState, useEffect} from 'react'
import { getAllGalleries,} from '../../api/gallery'
import CreateGalleryModal from './CreateArtistModal'
import Gallery from './Gallery'
import {message} from '../shared/AutoDismissAlert/messages'
import {FiPlus } from 'react-icons/fi'

const CuratorIndex = props => {
    const { msgAlert, user } = props

    const [galleryArray, setGalleryArray] = useState([])
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [createGalleryModalShow, setCreateGalleryModalShow] = useState(false)

    //making api call
    useEffect(() => {
        getAllGalleries()
            .then(res => {
                setGalleryArray(res.data.galleries)
            })

            //handle errors by sending user an error message
            .catch(err => {
                msgAlert({
                    heading: 'Error!',
                    message: message.getArtistsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [updated])

    //if there is an error, display the error
    if (error) {
        return <p>Error Ocurred!</p>
    }


    const GalleryList = galleryArray.map((person, i) => (

        <Gallery
            key={person._id}
            person={person}
            user={user}
            msgAlert={msgAlert}
            triggerRefresh={() => setUpdated(prev => !prev)}
        />
    ))


    return (
        <div className='main'>
            <div>
                <h3>Total Galleries: </h3>
                <FiPlus onClick={() => setCreateGalleryModalShow(true)} />
            </div>

            <div>{GalleryList}</div>


            <CreateGalleryModal
                user={user}
                show={createGalleryModalShow}
                msgAlert={msgAlert}
                handleClose={() => setCreateGalleryModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />


        </div>

    )
}

export default CuratorIndex
