import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { registerUser, loginUser } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate()
    // user registration 

    const [user, setUser] = useState({
        "username": "",
        "email": "",
        "password": "",

    })
    // console.log(user)

    const handleRegister = async () => {
        const { username, email, password } = user;
        if (!username || !email || !password) {
            alert("Please Add all details")
        }
        else {
            const response = await registerUser(user);
            const { data } = response;
            if (response.status === 201) {
                alert("Success")
                setUser(response.data)
                console.log(data)
            }
        }

    }

    // user login

    
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    
    const handleLogin = async () => {
        try {
            const response = await loginUser(loginData);
    
            if (response.status === 200) {
                const { data } = response;
                console.log("data from ser")
                    console.log(data)
    
                const { email, password } = loginData;
                const user = response.data.find(user => user.email === email);
    
                if (user) {
                    if (user.password === password) {
                        console.log('User found');
                        const userId = user.id
                        localStorage.setItem('userId',userId)
                        navigate('/dashboard');
                    } else {
                        alert("Wrong password");
                    }
                } else {
                    console.log('User not found');
                }
            } else {
                console.log('Error: Login failed');
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };
    


    return (
        <div className='container p-5'>
            <Row>
                <Col lg={6} md={6} >
                    <Container>
                        <div className='d-flex justify-content-center align-items-center ' style={{ height: '30rem' }}>
                            <div>
                                <h2>Sign Up</h2>
                                <Form >
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                    </Form.Group>
                                    <div className='d-flex justify-content-center'>
                                        <button type='button' className='btn btn-primary' onClick={handleRegister}>Signup</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Container>
                </Col>
                <Col lg={6} md={6} >
                    <Container>
                        <div className='d-flex justify-content-center align-items-center ' style={{ height: '30rem' }}>
                            <div >
                                <h2>Sign In</h2>
                                <Form >
                                    <Form.Group className="mb-3" >
                                        <Form.Label>email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                                    </Form.Group>
                                    <div className='d-flex justify-content-center'>
                                        <Link ><button className='btn btn-primary' onClick={handleLogin}>Sign In</button>
                                        </Link>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}

export default Home
