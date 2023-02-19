// Exhibit will display the array of the artwork subdoc
// as a scrollable (and hopefully swipable on touch screens) carousel of images
// it will also use a lot of icons overlayed on the image
// as a UI of sorts.  The icons should appear on load, dissolve after 2-3 seconds
// and reappear when the screen is clicked/touched if possible.
// The artwork's info will be contained in a drawed that can be opened from
// the bottom of the screen.

import { FiChevronLeft, FiChevronRight, FiChevronUp, FiX } from 'react-icons/fi'

const ExhibitModal = props => {
    const { artPiece } = props

    return (
        <div className='exhibit'>
            <div className='exhibit-art-display'>
                <img
                    src={artPiece.image}
                    alt=''
                />
            </div>
            <div className='exhibit-ui'>
                <h4 className='exhibit-ui__title'>{artPiece.title}</h4>
                <p className='exhibit-ui__artist'>{artPiece.artist.name}</p>
                {/* icons needed : return to gallery, left, right, up to open drawer */}
                <FiX />
                <FiChevronLeft />
                <FiChevronRight />
                <FiChevronUp />
            </div>
        </div>
    )
}

export default ExhibitModal
