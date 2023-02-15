// ArtworkIndex will display the array of the artwork subdoc
// as a scrollable (and hopefully swipable on touch screens) carousel of images
// it will also use a lot of icons overlayed on the image
// as a UI of sorts.  The icons should appear on load, dissolve after 2-3 seconds
// and reappear when the screen is clicked/touched if possible.
// The artwork's info will be contained in a drawed that can be opened from
// the bottom of the screen.

const ArtworkIndex = props => {
    const { image } = props

    return (
        <div>
            <div className='artwork-index__art-display'>
                <img
                    src={image}
                    alt=''
                ></img>
            </div>
            <div className='artwork-index__ui'>
                {/* icons needed : return to gallery, left, right, up to open drawer */}
            </div>
        </div>
    )
}

export default ArtworkIndex
