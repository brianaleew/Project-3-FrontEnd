// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import ShowGallery from './components/galleries/ShowGallery'
import ArtistIndex from './components/artists/ArtistIndex'
import ShowArtist from './components/artists/ShowArtist'
import CuratorIndex from './components/galleries/CuratorIndex'
import ArtworkIndex from './components/artwork/ArtworkIndex'

const App = () => {
    const [user, setUser] = useState(null)
    const [msgAlerts, setMsgAlerts] = useState([])

    // console.log('user in app', user)
    // console.log('message alerts', msgAlerts)
    const clearUser = () => {
        // console.log('clear user ran')
        setUser(null)
    }

    const deleteAlert = id => {
        setMsgAlerts(prevState => {
            return prevState.filter(msg => msg.id !== id)
        })
    }

    const msgAlert = ({ heading, message, variant }) => {
        const id = uuid()
        setMsgAlerts(() => {
            return [{ heading, message, variant, id }]
        })
    }

    return (
        <Fragment>
            <Header user={user} />
            <Routes>
                <Route
                    path='/'
                    element={
                        <Home
                            msgAlert={msgAlert}
                            user={user}
                        />
                    }
                />
                <Route
                    path='/sign-up'
                    element={
                        <SignUp
                            msgAlert={msgAlert}
                            setUser={setUser}
                        />
                    }
                />
                <Route
                    path='/sign-in'
                    element={
                        <SignIn
                            msgAlert={msgAlert}
                            setUser={setUser}
                        />
                    }
                />
                <Route
                    path='/sign-out'
                    element={
                        <RequireAuth user={user}>
                            <SignOut
                                msgAlert={msgAlert}
                                clearUser={clearUser}
                                user={user}
                            />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/change-password'
                    element={
                        <RequireAuth user={user}>
                            <ChangePassword
                                msgAlert={msgAlert}
                                user={user}
                            />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/galleries-mine'
                    element={
                        <RequireAuth user={user}>
                            <CuratorIndex
                                user={user}
                                msgAlert={msgAlert}
                            />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/galleries/:id'
                    element={
                        <RequireAuth user={user}>
                            <ShowGallery
                                user={user}
                                msgAlert={msgAlert}
                            />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/artists'
                    element={
                        <RequireAuth user={user}>
                            <ArtistIndex
                                msgAlert={msgAlert}
                                user={user}
                            />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/artworks/:id'
                    element={
                        <RequireAuth user={user}>
                            <ArtworkIndex
                                msgAlert={msgAlert}
                                user={user}
                            />
                        </RequireAuth>
                    }
                />
                <Route
                    path='/artists/:id'
                    element={
                        <ShowArtist
                            msgAlert={msgAlert}
                            user={user}
                        />
                    }
                />
            </Routes>
            {msgAlerts.map(msgAlert => (
                <AutoDismissAlert
                    key={msgAlert.id}
                    heading={msgAlert.heading}
                    variant={msgAlert.variant}
                    message={msgAlert.message}
                    id={msgAlert.id}
                    deleteAlert={deleteAlert}
                />
            ))}
            <Footer />
        </Fragment>
    )
}

export default App
