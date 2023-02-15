import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneGallery, removeGallery, updateGallery } from '../../api/gallery'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
// import EditGalleryModal from './EditGalleryModal'
// import ShowArtwork from '../artwork/ArtworkIndex'
// import NewArtworkModal from '../artworks/NewArtworkModal'

// we need to get the gallery's id from the route parameters
// then we need to make a request to the api
// when we retrieve a gallery from the api, we'll render the data on the screen

const artworkCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowGallery = (props) => {
    const [gallery, setGallery] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [artworkModalShow, setArtworkModalShow] = useState(false)
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
                    variant: 'danger'
                })
            })
    }, [updated])

    // here's where our removeGallery function will be called
    const setGalleryFree = () => {
        removeGallery(user, gallery.id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeGallerySuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeGalleryFailure,
                    variant: 'danger'
                })
            })
    }

    // let artworkCards
    // if (gallery) {
    //     if (gallery.artworks.length > 0) {
    //         artworkCards = gallery.artworks.map(artwork => (
    //             <ShowArtwork
    //                 key={artwork.id} 
    //                 artwork={artwork}
    //                 user={user}
    //                 gallery={gallery}
    //                 msgAlert={msgAlert}
    //                 triggerRefresh={() => setUpdated(prev => !prev)}
    //             />
    //         ))
    //     }
    // }

    if(!gallery) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    {/* <Card.Header>{ gallery.fullTitle }</Card.Header> */}
                    <Card.Body>
                        <Card.Text>
                            <div><small>Description: { gallery.description }</small></div>
                            <div><small>Location: { gallery.location }</small></div>
                            <div>
                                <small>
                                    Curators: { gallery.curators ? 'yes' : 'no' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button 
                            className="m-2" variant="info"
                            onClick={() => setArtworkModalShow(true)}
                        >
                            Give {gallery.name} an artwork!
                        </Button>
                        {
                            gallery.owner && user && gallery.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {gallery.name}
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => setGalleryFree()}
                                >
                                 {gallery.name} 
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className="m-2" style={artworkCardContainerLayout}>
                {/* {artworkCards} */}
            </Container>
            {/* <EditGalleryModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateGallery={updateGallery}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                gallery={gallery}
            /> */}
            {/* <NewArtworkModal 
                gallery={gallery}
                show={artworkModalShow}
                handleClose={() => setArtworkModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            /> */}
        </>
    )
}

export default ShowGallery
