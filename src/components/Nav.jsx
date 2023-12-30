import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function Nav() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary  w-100 d-flex align-items-center justify-content-center" bg="dark" data-bs-theme="dark">
            <Navbar.Brand><Link to='/' style={{textDecoration:'none'}}>Task Manager</Link></Navbar.Brand>
        </Navbar>
      );
}

export default Nav;
