// This component will serve as an Index of Artists but also give the user the option to edit or delete the artist
import { useState, useEffect } from 'react'
import { getAllArtists, createArtist, updateArtist, deleteArtist } from '../../api/artist'
import EditArtistModal from './EditArtistModal'
import CreateArtistModal from './CreateArtistModal'
import ArtistForm from '../shared/ArtistForm'
import messages, { deleteArtistFailure, deleteArtistSuccess, getArtistsFailure } from '../shared/AutoDismissAlert/messages'



const ArtistIndex = (props) => {

    const { msgAlert, user, artist, triggerRefresh, editArtist } = props

    const [artists, setArtists] = useState(null)
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [editArtistModalShow, seteditArtistModalShow] = useState(false)
    const [createArtistModalShow, setcreateArtistModalShow] = useState(false)
    
    
    //making api call
    useEffect(() => {
        getAllArtists()
            .then(res => setArtists(res.data.artists))
            //handle errors by sending user an error message
            .catch(err => {
                msgAlert({
                    heading: 'Error!',
                    message: getArtistsFailure,
                    variant: 'danger'
                })
               setError(true) 
            })

    }, [updated])

    //if there is an error, display the error
    if (error) {
        return <p>Error Ocurred!</p>
    }

    //the function for deleting artists from the index
    const removeArtist = () => {
        //calling api delete func 
        deleteArtist(user, artist.id)
            //sending success message to user
            .then(() => {
                msgAlert({
                    heading: 'Deletion Success',
                    message: deleteArtistSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Deletion Success',
                    message: deleteArtistFailure,
                    variant: 'danger'
                })
            })
    }
    //Once api call gets artists, iterate through each one and render this style
    const artistDisplays = artists.map(artist => {
            return (
                // not final
                <div>
                    <img src={artist.img} alt='picture of the artist' />
                    <p>{artist.name}</p>
                    <p>{artist.location}</p>
                    <p>{artist.website}</p>
                </div>
            )
        })






    return(
        <>
        <div>
            <h3>Total Artists: </h3>
            {/* add new artist button here */}    
        </div>


        <div>
            {artistDisplays}
        </div>

        <div>
            {/* icon btns for edit and delete go here */}
            {/* making modal buttons
            edit modal button
            <Button onClick{() => setEditModalShow(true)}
            > Edit Artist</Button>

            create modal button
            <Button onClick{() => setEditModalShow(true)}
            > Edit Artist</Button>
            */}
        </div>



        {/* importing Modals below...may still need some fine tuning */}
        <CreateArtistModal
            user={user}
            artist={artist}
            show={createArtistModalShow(false)}
            createArtist={createArtist}
            msgAlert={msgAlert}
            
        />
        
        
        
        <EditArtistModal
            user={user}
            artist={artist}
            show={editArtistModalShow}
            handleClose={() => seteditArtistModalShow(false)}
            triggerRefresh={() => setUpdated(true)}
            updateArtist={updateArtist}
            editArtist={editArtist}
            msgAlert={msgAlert}
        />

        
        </>
    )
}


export default ArtistIndex