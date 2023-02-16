import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'var(--color-primary)',
    textDecoration: 'none'
}
const dropdownNav = {
	
}
const authenticatedOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='artists' style={linkStyle}>
				Artist Index 
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='artists/:id' style={linkStyle}>
				Artist Show 
			</Link>
		</Nav.Item>

	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2'>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='light' variant='light' expand='md'>
		<Navbar.Brand className='m-2'>
            <Link to='/' style={linkStyle}>
                galleryhub
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' className='m-2' />
		<Navbar.Collapse id='basic-navbar-nav' style={dropdownNav}className='m-2 nav justify-content-end bg-muted' >
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
