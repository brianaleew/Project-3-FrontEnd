import { useState, useEffect } from 'react'
import { getAllGalleries } from '../../api/gallery'
import messages from '../shared/AutoDismissAlert/messages'
import { FiImage, FiCompass } from 'react-icons/fi'

import './GalleryIndex.css'
import { Link } from 'react-router-dom'

const GalleryIndex = props => {
    const { user, msgAlert } = props
    const [galleriesA, setGalleriesA] = useState([])

    useEffect(() => {
        getAllGalleries()
            .then(res => {
                // console.log('res data: ', res.data.galleries)
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

    // console.log(galleriesA)
    const galleryArray = galleriesA.map(gallery => (
        <li
            className='gallery-index__gallery-container'
            key={gallery._id}
        >
            <Link to={`/galleries/${gallery._id}`}>
                <div>
                    <p className='gallery-index__gallery-name'>
                        {gallery.name}
                    </p>
                </div>

                <img
                    className='gallery-index__gallery-image'
                    src={'/images/art-gallery.jpg'}
                    alt='hero'
                />
            </Link>
        </li>
    ))

    // console.log(galleryArray)

    return (
        <div className='main'>
            <div className='gallery-index__hero'>
                <img
                    className='gallery-index__hero-image'
                    src={'/images/art-gallery.jpg'}
                    alt='hero'
                />
                <div className='gallery-index__hero-icons gh-flex-row'>
                    <div className='gh-flex-clm-c'>
                        <FiCompass
                            // color='white'
                            size='5rem'
                        />
                        <p>Explore</p>
                    </div>
                    <div className='gh-flex-clm-c'>
                        <FiImage
                            // color='white'
                            size='5rem'
                        />
                        <p>Curate</p>
                    </div>
                </div>
            </div>
            <div className='home-description'>
                <h1 >Welcome to Gallery Hub</h1>
                <h4 style={{padding: '1rem'}}>Create and Share your Galleries with the world!</h4>
                <h4 >View your favorite artists or artworks from anywhere!</h4>
            </div>

            <div className='gh-main-container'>
                <p className='recommended'>Recommended Galleries</p>
                <ul className='gh-grid-400'>{galleryArray}</ul>
            </div>
        </div>
    )
}

export default GalleryIndex
