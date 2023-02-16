import { useState, useEffect } from 'react'
import { getAllGalleries } from '../../api/gallery'
import messages from '../shared/AutoDismissAlert/messages'

import './GalleryIndex.css'

const GalleryIndex = props => {
    const { user, msgAlert } = props
    const [galleriesA, setGalleriesA] = useState([])

    useEffect(() => {
        getAllGalleries()
            .then(res => {
                console.log('res data: ', res.data.galleries)
                setGalleriesA(res.data.galleries)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting gallerys',
                    message: messages.getGalleriesFailure,
                    variant: 'danger',
                })
            })
    }, [])

    console.log(galleriesA)
    const galleryArray = galleriesA.map(gallery => (
        <li key={gallery._id}>
            <h5>{gallery.name}</h5>
            <img
                className='gallery-index__gallery-image'
                src={'/art-gallery.jpg'}
                alt='hero'
            />
        </li>
    ))

    console.log(galleryArray)

    return (
        <div>
            <img
                className='gallery-index__hero-image'
                src={'/art-gallery.jpg'}
                alt='hero'
            />
            <div className='gh-main-container'>
                <h4>recommended galleries</h4>
                <ul className='gh-grid-400'>{galleryArray}</ul>
            </div>
        </div>
    )
}

export default GalleryIndex
