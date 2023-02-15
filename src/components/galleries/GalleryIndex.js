import { useState, useEffect } from 'react'
import { getAllGalleries } from "../../api/gallery"
import messages from '../shared/AutoDismissAlert/messages'


const GalleryIndex = (props) => {
    const {user, msgAlert} = props
    const [galleries, setGalleries] = useState(null) 
    useEffect(() => {
        getAllGalleries()
            .then(res => setGalleries(res.data.gallery))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting gallerys',
                    message: messages.getGalleriesFailure,
                    variant: 'danger',
                })
            })
    }, [])


    const galleryArray = () => {

        galleries.map(gallery =>{
        return (

        <li>
           
         <h3>{gallery.name}</h3>
         <img src = {gallery.img}></img>

        </li>

        )}

        )
    }

    return (

        <div>
        <img src =" "></img>
        <div>

            <h1>Recommended Galleries</h1>

            <ul>{galleryArray}</ul>

        </div>
        </div>

    )
  
}




export default GalleryIndex