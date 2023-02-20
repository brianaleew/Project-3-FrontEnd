import GalleryIndex from './galleries/GalleryIndex'

const Home = props => {
    // const { msgAlert, user } = props
    // console.log('props in home', props)

    return (
        <>
            <GalleryIndex
                msgAlert={props.msgAlert}
                user={props.user}
            />
        </>
    )
}

export default Home
