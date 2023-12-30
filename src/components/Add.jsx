import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadProject } from '../services/allAPI';


function Add({userId,setUploadProjectStatus}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const userId = userId
    const [project, setProject] = useState({
        user_id: `${userId}`,
        title: "",
        description: "",
        deadline: "",
        tasks: [],
        
    })
    const uploadProjectToDb = async () => {
        const { title, description, deadline, userId } = project;
        console.log(project)
        if (title && description&& deadline && !userId) {
            try {
                const response = await uploadProject(project);
                setUploadProjectStatus(response.data)
                handleClose()
            }
            catch (err) {
                console.log(err)
            }        }
        else {
            alert("please add all details")
        }
    }

    return (
        <div>
            <div>
                <Button variant="primary" onClick={handleShow}>
                    Add New Project
                </Button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control type="text" placeholder="Name of Your New Project" onChange={(e) => setProject({ ...project, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3 text-secondary" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="About the Project" onChange={(e) => setProject({ ...project, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control type="date" placeholder="Deadline" onChange={(e) => setProject({ ...project, deadline: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={uploadProjectToDb}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Add
