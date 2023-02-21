//This form will be used for both EDITING and CREATING artists

import { Form, Button, Container } from 'react-bootstrap'

const ArtistForm = props => {
    //pulling in props we need
    const { artist, handleChange, handleSubmit, heading } = props

    return (
        <Container className='form-styles__container'>
            <h3> {heading} </h3>
            {/* setting up the form */}
            <Form
                onSubmit={handleSubmit}
                className='form-styles__form'
            >
                <Form.Group>
                    <Form.Label>artist name:</Form.Label>
                    <Form.Control
                        placeholder="Type the Artist's Name Here"
                        name='name'
                        id='name'
                        value={artist.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>location</Form.Label>
                    <Form.Control
                        placeholder='Where is the Artist located or from (if deceased)?'
                        name='location'
                        id='location'
                        value={artist.location}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>website</Form.Label>
                    <Form.Control
                        placeholder="Place a link to the Artist's portfolio here"
                        name='website'
                        id='website'
                        value={artist.website}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>artist image (url)</Form.Label>
                    <Form.Control
                        className='artist-form-input-box'
                        placeholder='Place the image link to your artist picture here'
                        name='img'
                        id='img'
                        value={artist.img}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>description</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows='10'
                        aria-label='With textarea'
                        placeholder='Tell us about the Artist'
                        name='description'
                        id='description'
                        value={artist.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button
                    type='submit'
                    className='gh-btn'
                >
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default ArtistForm
