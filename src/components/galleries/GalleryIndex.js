import { useState, useEffect } from 'react'
import { getAllGalleries } from '../../api/gallery'
import messages from '../shared/AutoDismissAlert/messages'
import { FiImage, FiCompass } from 'react-icons/fi'
<<<<<<< HEAD

import './GalleryIndex.css'
=======
>>>>>>> bcd5f65 (moar landing page styling and sign in page styling)

import './GalleryIndex.css'

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <p>{gallery.name}</p>
=======
            <h5>{gallery.name}</h5>
>>>>>>> bf30351 (landing page style part 1)
=======
            <p>{gallery.name}</p>
>>>>>>> bcd5f65 (moar landing page styling and sign in page styling)
=======
            <p>{gallery.name}</p>
=======
            <h5>{gallery.name}</h5>
>>>>>>> c6bc717 (landing page style part 1)
>>>>>>> 5c47a7c (landing page style part 1)
            <img
                className='gallery-index__gallery-image'
                src={'/art-gallery.jpg'}
                alt='hero'
            />
        </li>
    ))

    console.log(galleryArray)

    return (
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bcd5f65 (moar landing page styling and sign in page styling)
=======
>>>>>>> 5c47a7c (landing page style part 1)
        <div className='main'>
            <div className='gallery-index__hero'>
                <img
                    className='gallery-index__hero-image'
                    src={'/art-gallery.jpg'}
                    alt='hero'
                />
                <div className='gallery-index__hero-icons gh-flex-row'>
                    <div className='gh-flex-clm-c'>
                        <FiCompass
                            // color='white'
                            size='5rem'
                        />
                        <p>explore</p>
                    </div>
                    <div className='gh-flex-clm-c'>
                        <FiImage
                            // color='white'
                            size='5rem'
                        />
                        <p>curate</p>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
            <div className='gh-main-container'>
                <p>recommended galleries</p>
=======
        <div>
            <img
                className='gallery-index__hero-image'
                src={'/art-gallery.jpg'}
                alt='hero'
            />
            <div className='gh-main-container'>
                <h4>recommended galleries</h4>
>>>>>>> bf30351 (landing page style part 1)
=======
            <div className='gh-main-container'>
                <p>recommended galleries</p>
>>>>>>> bcd5f65 (moar landing page styling and sign in page styling)
                <ul className='gh-grid-400'>{galleryArray}</ul>
=======
        <div>
<<<<<<< HEAD
        <img src =" "></img>
        <div>

            <h1>Recommended Galleries</h1>

                <ul>{galleryArray}</ul>
=======
            <img
                className='gallery-index__hero-image'
                src={'/art-gallery.jpg'}
                alt='hero'
            />
            <div className='gh-main-container'>
                <h4>recommended galleries</h4>
                <ul className='gh-grid-400'>{galleryArray}</ul>
>>>>>>> bf30351 (landing page style part 1)
>>>>>>> c6bc717 (landing page style part 1)
            </div>
        </div>
    )
}

export default GalleryIndex