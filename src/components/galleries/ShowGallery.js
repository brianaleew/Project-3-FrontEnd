import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneGallery, removeGallery, updateGallery } from '../../api/gallery'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditGalleryModal from './EditGalleryModal'
import './ShowGallery.css'

// import ShowArtwork from '../artwork/ArtworkIndex'
// import NewArtworkModal from '../artworks/NewArtworkModal'

const ShowGallery = props => {
    const [gallery, setGallery] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [editArtworkModalShow, setEditArtworkModalShow] = useState(false)
    const [editArtistModalShow, setEditArtistModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in ShowGallery props', user)
    console.log('msgAlert in ShowGallery props', msgAlert)

    useEffect(() => {
        getOneGallery(id)
            .then(res => setGallery(res.data.gallery))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting gallerys',
                    message: messages.getGalleriesFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const deleteGallery = () => {
        removeGallery(user, gallery.id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeGallerySuccess,
                    variant: 'success',
                })
            })
            .then(() => {
                navigate('/')
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeGalleryFailure,
                    variant: 'danger',
                })
            })
    }

    if (!gallery) {
        return <LoadingScreen />
    }
    //    console.log(user.isCurator)

    // const conditionalInterface = 
    //     if (user.isCurator) {
    //         return (
    //             <div className='show-gallery__curator-interface'>
    //                 <div className='show-gallery__links-container'>
    //                     <div
    //                         className='btn btn-primary'
    //                         onClick={() => setEditModalShow(true)}
    //                     >
    //                         manage gallery
    //                     </div>
    //                     <Link to={`/artworks/${gallery.id}`}>
    //                         manage exhibit
    //                     </Link>
    //                     <Link to={`/artists/${gallery.id}`}>
    //                         manage artists
    //                     </Link>
    //                 </div>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className='show-gallery__explorer-interface'>
    //                 <div className='show-gallery__links-container'>
    //                     <Link to={`/artworks/${gallery.id}`}>view exhibit</Link>
    //                 </div>
    //                 <div className='show-gallery__featured-artists'>
    //                     <h4 className='show-gallery__featured-artists-title'>
    //                         featured artists
    //                     </h4>
    //                     <ul className='show-gallery__featured-artists-list'>
    //                         {/* a list of the artists added by the gallery's curator */}
    //                         {/* shown as either a grid or a carousel */}
    //                         {/* on the backend artworks route, instead of trowing an error */}

    //                         {/* if the user is not a creator, maybe */}
    //                     </ul>
    //                 </div>
    //             </div>
    //         )
    //     }
    
    return (
        <div className='show_gallery__gallery-container'>
            <div className='show-gallery__gallery-hero'>

                <div className='show-gallery__gallery-hero-img'>
                    
                    <img
                    src= {'gallery.image'}
                    alt='gallery'
                    />

                </div>


                <div className='show-gallery__gallery-name'>
                    <h3>{gallery.name}</h3>
                    </div>


            </div>


            <div className='show-gallery__gallery-main'>


                <div className='show-gallery__gallery-location' ><h4>{gallery.location}</h4></div>

                 {/* gallery.address is not showing on the page?? */}
                <h4 className='show-gallery__physical-address'>{gallery.address}</h4>
                
                <div className='show-gallery__gallery-description'><p>{gallery.description}</p></div>

            </div>

            {user.isCurator ? 
            
            (
              
                <div className='show-gallery__curator-interface'>
                    <div className='show-gallery__links-container'>
                        <div
                            className='btn btn-primary'
                            onClick={() => setEditModalShow(true)}
                        >
                            Manage gallery
                        </div>
                        
                 
                            
                         <Link 
                         to={`/artworks/${gallery.id}`}  
                         className='btn btn-primary'
                         style={{marginLeft:'10px'}}
                         >
                            Manage exhibit
                        </Link>
                        
                    
                      
                        <Link 
                        to={`/artists/${gallery.id}`} 
                        className='btn btn-primary' 
                        style={{marginLeft:'10px'}}>
                            Manage artists
                        </Link>
                    </div>
                </div>

            )

            :
            (
             
                <div className='show-gallery__explorer-interface'>
                    <div className='show-gallery__links-container'>
                        <Link to={`/artworks/${gallery.id}`}>View exhibit</Link>
                    </div>
                    <div className='show-gallery__featured-artists'>
                        <h4 className='show-gallery__featured-artists-title'>
                            Featured artists
                        </h4>
                        <ul className='show-gallery__featured-artists-list'>
                            {/* a list of the artists added by the gallery's curator */}
                            {/* shown as either a grid or a carousel */}
                            {/* on the backend artworks route, instead of trowing an error */}

                            {/* if the user is not a creator, maybe */}
                        </ul>
                    </div>
                </div>
            )
                }
            
            <EditGalleryModal

                user = {user}
                show = {editModalShow}
                handleClose = {()=> setEditModalShow(false)}
                updateGallery = {updateGallery}
                msgAlert = {msgAlert}
                triggerRefresh = {()=> setUpdated(prev => !prev)}
                gallery = {gallery}

            />
            {/* we have to add our Edit Gallery modal here but I don't know where I should exactly add it */}
        </div>
    )
}

export default ShowGallery