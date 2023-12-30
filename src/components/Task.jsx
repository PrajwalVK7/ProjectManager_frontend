import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addTask } from '../services/allAPI';
import { getProjectById } from '../services/allAPI';

function Task({ projectId ,setIsTaskUpdated}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [task, setTask] = useState({
        taskTitle: '',
        taskDescription: '',
        remarks: ''
    });
    const handleAddTask = async () => {
            const retrievedProject = await getProjectById(projectId); // old project
            const updatedProject = retrievedProject.data  // old project data
            updatedProject.tasks.push(task);  // added task to project data
            const response = await addTask(projectId, updatedProject ); // task added to project in db using PUT mthod
            // console.log('Task :', response);
            handleClose(); 
            setIsTaskUpdated(true)
    };

    return (
        <div>
            <div>
                <Button variant="primary" onClick={handleShow}>
                    Add New Project Task
                </Button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Tasks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task title</Form.Label>
                            <Form.Control type="text" placeholder="Name of Your New Project" onChange={(e) => setTask({ ...task, taskTitle: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3 text-secondary" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="About the Project" onChange={(e) => setTask({ ...task, taskDescription: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control type="text" placeholder="Remarks" onChange={(e) => setTask({ ...task, remarks: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddTask}>Add Task</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Task;
