//This form will be used for both EDITING and CREATING artists

import { Form, Button, Container } from 'react-bootstrap'

const ArtistForm = props => {
    //pulling in props we need
    const { artwork, handleChange, handleSubmit, heading } = props

    return (
        <Container className='form-styles__container'>
            <h3> {heading} </h3>
            {/* setting up the form */}
            <Form
                onSubmit={handleSubmit}
                className='form-styles__form'
            >
                <Form.Group>
                    <Form.Label>title</Form.Label>
                    <Form.Control
                        placeholder='title of the art'
                        name='name'
                        id='name'
                        value={artwork.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>artist</Form.Label>
                    <Form.Control
                        placeholder='name of the artist'
                        name='artist'
                        id='artist'
                        value={artwork.artist}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>date</Form.Label>
                    <Form.Control
                        placeholder='year (or range) of artwork creation'
                        name='date'
                        id='date'
                        value={artwork.date}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>media</Form.Label>
                    <Form.Control
                        placeholder='specify the media of your artwork (eg oil on canvas)'
                        name='media'
                        id='media'
                        value={artwork.media}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>art image (url)</Form.Label>
                    <Form.Control
                        className='artist-form-input-box'
                        placeholder='place the image link to your artwork picture here'
                        name='img'
                        id='img'
                        value={artwork.img}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>description</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows='10'
                        aria-label='With textarea'
                        placeholder='tell us about the artwork'
                        name='description'
                        id='description'
                        value={artwork.description}
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
