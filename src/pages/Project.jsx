import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Task from '../components/Task'
import TaskView from '../components/TaskView'
import { Link } from 'react-router-dom'
import { displayUser } from '../services/allAPI'
import { getProjectById } from '../services/allAPI'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
function Project() {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate()

    const { projectId } = useParams();
    const [isTaskUpdated, setIsTaskUpdated] = useState(false)
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        id: ""
    });
    const [projectData, setProjectData] = useState([])
    const getUserData = async (userId) => {
        const response = await displayUser(userId);
        const { data } = response;
        setUserData(data);
    };

    const getProjectDetails = async () => {
        try {
            const response = await getProjectById(projectId);
            const { data } = response;
            setProjectData(data);
        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    };



    useEffect(() => {
        getUserData(userId);
        getProjectDetails(projectId);
    }, [projectId]);


    console.log("Project Data:", projectData);
    return (
        <div className='container'>
            <header className='mt-3'>
                <div className='d-flex align-items-center justify-content-between'>
                    <h3>{userData.username}</h3>
                    <div className='ms-auto' >
                        <Link to='/dashboard'><button className='btn btn-warning me-3'>Dashboard</button>
                        </Link>
                        <button className='btn btn-warning'><Link to='/' style={{textDecoration:'none',color:'white'}}>Logout</Link></button>
                    </div>
                </div>
            </header>
            <div className='mt-5 mb-5 p-3 rounded-3' style={{ backgroundColor: 'black' }}>
                <div key={projectData.id}>
                    <Row>
                        <h2 className='text-center'>{projectData.title}</h2>
                        <Col lg={6} md={6}>
                            <p className='text-center'>{projectData.description}</p>
                        </Col>
                        <Col lg={6} md={6}>
                            <h5 className='text-center'>Last date : {projectData.deadline}</h5>
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-center gap-5'>
                        <Task setIsTaskUpdated={setIsTaskUpdated} projectId={projectData.id} />
                        <button className='btn btn-success rounded'>Mark as Done</button>
                    </div>
                    <div>
                        <TaskView isTaskUpdated={isTaskUpdated} projectId={projectData.id} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Project
