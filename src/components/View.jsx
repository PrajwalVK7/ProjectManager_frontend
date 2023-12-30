import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteProject, getProject } from '../services/allAPI'

function View(props) {
    const user_id = props.user_id
    const [projectData, setProjectData] = useState([])
    const [deleteProjectStatus,setDeleteProjectStatus] = useState(false)

    const displayProjects = async () => {
        const response = await getProject(user_id)
        const { data } = response
        setProjectData(data)
        // console.log("asafakj",projectData)
    }
        // delete

    const handleDelete = async (id)=>{
        const response = await deleteProject(id)
        // console.log(response)
        if(response.status===200){
            setDeleteProjectStatus(true)
        }
        else{
            console.log("err")
        }
    }
    useEffect(() => {
        displayProjects()
    }, [deleteProjectStatus,props.uploadProjectStatus])



    return (
        <div>
            <Row>
                {
                    projectData.length > 0 ?
                        projectData.map((items) => (
                            <Col lg={3} >
                                <div className='mt-5 mb-5 p-3 rounded-3' style={{ backgroundColor: 'black',height:'15rem' }}>
                                    <h2>{items.title}</h2>
                                    <p>{items.description}</p>
                                    <h5>Deadline : {items.deadline}</h5>
                                    <div className='d-flex justify-content-evenly mt-5'>
                                    <Link to={`/project/${items.id}`}><button className='btn btn-success rounded'>View</button></Link>
                                        <button className='btn btn-warning rounded' onClick={()=>{handleDelete(items.id)}}>Delete</button>
                                    </div>
                                </div>
                            </Col>
                        )):
                        <p>No projects</p>
                }

            </Row>
        </div>
    )
}

export default View
