import { FiChevronLeft, FiChevronRight, FiChevronUp, FiX } from 'react-icons/fi'

const ExhibitArt = props => {
    const { artPiece, msgAlert, user } = props
    return (
        <div className='exhibit-art'>
            <div className='exhibit-art-display'>
                <img
                    // src={artPiece.image}
                    src='/Old-Guitarist.gif'
                    alt=''
                />
            </div>
            <div className='exhibit-ui'>
                <div className='exhibit-ui__header'>
                    <h4 className='exhibit-ui__title'>{artPiece.title}</h4>
                    {artPiece.artists.map(artist => (
                        <p className='exhibit-ui__artists'>{artist.name}</p>
                    ))}
                    <FiX className='exhibit-ui__btn-exit' />
                </div>

                {/* icons needed : return to gallery, left, right, up to open drawer */}
                <FiChevronLeft className='exhibit-ui__btn-prev' />
                <FiChevronRight className='exhibit-ui__next' />
                <FiChevronUp className='exhibit-ui__details' />
            </div>
        </div>
    )
}

export default ExhibitArt
