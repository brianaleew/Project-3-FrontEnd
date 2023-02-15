import GalleryIndex from "./galleries/GalleryIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
		
			<h2 className="m-3">Gallery Hub</h2>
			<GalleryIndex msgAlert={props.msgAlert} user={props.user} />

		</>
	)
}

export default Home
