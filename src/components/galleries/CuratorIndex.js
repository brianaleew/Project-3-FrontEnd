// This component will serve as an Index of Artists but also give the user the option to edit or delete the artist
import { useState, useEffect } from 'react'
import { getMyGalleries } from '../../api/gallery'
import CreateGalleryModal from './CreateGalleryModal'
import Gallery from './Gallery'
import messages from '../shared/AutoDismissAlert/messages'
import { FiPlus } from 'react-icons/fi'
import '../../index.css'

const CuratorIndex = props => {
    const { msgAlert, user } = props

    const [galleryArray, setGalleryArray] = useState([])
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [createGalleryModalShow, setCreateGalleryModalShow] = useState(false)

    //making api call
    useEffect(() => {
        getMyGalleries(user)
            .then(res => {
                console.log(res)
                setGalleryArray(res.data.galleries)
            })

            //handle errors by sending user an error message
            .catch(err => {
                msgAlert({
                    heading: 'Error!',
                    message: messages.getMyGalleriesFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [updated])

    //if there is an error, display the error
    if (error) {
        return <p>Error Ocurred!</p>
    }

    const GalleryList = galleryArray.map((gal, i) => (
        <Gallery
            key={gal._id}
            gallery={gal}
            user={user}
            msgAlert={msgAlert}
            triggerRefresh={() => setUpdated(prev => !prev)}
        />
    ))

    // A counter for the number of galleries
    let galleryTotal = galleryArray.length

    return (
        <div className='main gh-main-container'>
            <div className='index-head'>
            <h3>Total Galleries: {galleryTotal} </h3>
                <span style={{display: 'flex'}}>
                    <h5 style={{padding: '0 1rem 0 0'}}>Add New</h5>
                    <FiPlus size='2rem' onClick={() => setCreateGalleryModalShow(true)} />
                </span>
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
