import { useState, useEffect } from 'react'
import { getAllGalleries } from '../../api/gallery'
import messages from '../shared/AutoDismissAlert/messages'

const GalleryIndex = props => {
    const { user, msgAlert } = props
    const [galleries, setGalleries] = useState(null)
    useEffect(() => {
        getAllGalleries()
            .then(res => {
                console.log('res data: ', res.data)
                setGalleries(res.data.galleries)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting gallerys',
                    message: messages.getGalleriesFailure,
                    variant: 'danger',
                })
            })
    }, [])

    console.log(galleries)
    const galleryArray = galleries.map(gallery => {
        return (
            <li>
                <h3>{gallery.name}</h3>
                <img
                    src={gallery.img}
                    alt='...'
                ></img>
            </li>
        )
    })

    return (
        <div>
            <img
                src='Images/art-gallery.jpg'
                alt='hero'
            ></img>
            <div>
                <h1>Recommended Galleries</h1>

                <ul>{galleryArray}</ul>
            </div>
        </div>
    )
}

export default GalleryIndex
