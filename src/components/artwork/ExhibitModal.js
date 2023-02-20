// Exhibit will display the array of the artwork subdoc
// as a scrollable (and hopefully swipable on touch screens) carousel of images
// it will also use a lot of icons overlayed on the image
// as a UI of sorts.  The icons should appear on load, dissolve after 2-3 seconds
// and reappear when the screen is clicked/touched if possible.
// The artwork's info will be contained in a drawed that can be opened from
// the bottom of the screen.
import { useState, useEffect } from 'react'
import { getAllArtwork } from '../../api/artist'
import ExhibitArt from './ExhibitArt'
import messages from '../shared/AutoDismissAlert/messages'
const ExhibitModal = props => {
    const { msgAlert, user } = props

    const [artworkArray, setArtworkArray] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        getAllArtwork()
            .then(res => {
                // console.log('This is artists', res.data.artists)
                setArtworkArray(res.data.artwork)
            })

            //handle errors by sending user an error message
            .catch(err => {
                msgAlert({
                    heading: 'Error!',
                    message: 'Artwork fail!',
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error Ocurred!</p>
    }

    const artworkList = artworkArray.map((artPiece, i) => (
        <ExhibitArt
            key={artPiece._id}
            artPiece={artPiece}
            user={user}
            msgAlert={msgAlert}
        />
    ))

    return <div className='exhibit gh-media-scroller'>{artworkList}</div>
}

export default ExhibitModal
