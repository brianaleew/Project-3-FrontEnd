// this form will take several props and be used both to create and update galleries
// the action will be dependent upon the parent component
// but the form will look the same on both Create and Update
import { Form, Button, Container } from 'react-bootstrap'

const GalleryForm = props => {
    // we need several props for a working, reusable form
    // the object itself(gallery), some handleChange fn, some handleSubmit fn
    // and in this case, we'll add a custom heading
    const { gallery, handleChange, handleSubmit, heading } = props

    return (
        <Container className='justify-content-center'>
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        placeholder="What is your gallery's name?"
                        name='name'
                        id='name'
                        value={gallery.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        placeholder="What is your gallery's description?"
                        name='description'
                        id='description'
                        value={gallery.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                        placeholder="What is gallery's location?"
                        name='location'
                        id='location'
                        value={gallery.age}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Image:</Form.Label>
                    <Form.Control
                        placeholder="Gallery's Image"
                        name='img'
                        id='img'
                        value={gallery.img}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button
                    className='m-2'
                    type='submit'
                >
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default GalleryForm
