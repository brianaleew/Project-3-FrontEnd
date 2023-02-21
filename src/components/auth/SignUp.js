// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import '../shared/FormStyles.css'

const SignUp = props => {
    // constructor(props) {
    // 	super(props)

    // 	this.state = {
    // 		email: '',
    // 		password: '',
    // 		passwordConfirmation: '',
    // 	}
    // }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [curatorFlag, setCuratorFlag] = useState(false)

    const navigate = useNavigate()

    const onSignUp = event => {
        event.preventDefault()

        const { msgAlert, setUser } = props

        const credentials = {
            email,
            password,
            passwordConfirmation,
            curatorFlag,
        }

        console.log('deez creds: ', JSON.stringify(credentials))

        signUp(credentials)
            .then(() => signIn(credentials))
            .then(res => setUser(res.data.user))
            .then(() =>
                msgAlert({
                    heading: 'Sign Up Success',
                    message: messages.signUpSuccess,
                    variant: 'success',
                })
            )
            .then(() => navigate('/'))
            .catch(error => {
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
                setCuratorFlag(false)
                msgAlert({
                    heading: 'Sign Up Failed with error: ' + error.message,
                    message: messages.signUpFailure,
                    variant: 'danger',
                })
            })
    }

    return (
        <div className='main'>
            <div className='form-styles__container gh-flex-clm'>
                <h3>Sign Up</h3>
                <Form
                    onSubmit={onSignUp}
                    className='form-styles__form'
                >
                    <Form.Group controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='Confirm Password'
                            onChange={e =>
                                setPasswordConfirmation(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group className='m-2'>
                        <Form.Check
                            label='Is this a curator?'
                            name='isCurator'
                            // defaultChecked={ gallery.curators }
                            onChange={() => setCuratorFlag(prev => !prev)}
                        />
                    </Form.Group>
                    <Button
                        className='gh-btn'
                        type='submit'
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SignUp
