//This form will be used for both EDITING and CREATING artists

import { Form, Button, Container } from 'react-bootstrap'

const artistForm = (props) => {
    //pulling in props we need 
    const { artist, handleChange, handleSubmit, heading } = props 

    return ( 
        <Container>
            <h3> {heading} </h3> 
            {/* setting up the form */}
            <Form onSubmit={handleSubmit}>
                <Form.Group> 
                    <Form.Label>Artist Name:</Form.Label>
                    <Form.Control
                        placeholder="Type the Artist's Name Here"
                        name="name"
                        id="name"
                        value={artist.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        placeholder="Tell us about the Artist"
                        name="description"
                        id="description"
                        value={artist.description}
                        onChange={handleChange}
                        />    
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        placeholder="Where is the Artist located or from (if deceased)?"
                        name="location"
                        id="location"
                        value={artist.location}
                        onChange={handleChange}
                        />    
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        placeholder="Where is the Artist located or from (if deceased)?"
                        name="location"
                        id="location"
                        value={artist.location}
                        onChange={handleChange}
                        />    
                </Form.Group>
                <Form.Group>
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        placeholder="Place a link to the Artist's portfolio here"
                        name="website"
                        id="website"
                        value={artist.website}
                        onChange={handleChange}
                        />    
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ArtistForm 