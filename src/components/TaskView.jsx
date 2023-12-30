import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getTasks } from '../services/allAPI'
function TaskView({ projectId , isTaskUpdated}) {
    // console.log("inside task view")
    // console.log(projectId)

    const [updatedTask, setUpdatedTask] = useState([])

    const displayTasks = async () => {
        try {
            const response = await getTasks(projectId);
            const { data } = response;
            
            if (data && data.tasks) {    // for checking the   project with task details is fetched. if not it will display error when mapping the dat
                const tasks = data.tasks;   
                setUpdatedTask(tasks);
                console.log(updatedTask);
            } else {
                console.error("No Tasks");
            }
        } catch (error) {
            console.error("Error :", error);
        }
    }
    

    useEffect(() => {
        displayTasks()
    }, [isTaskUpdated])
    console.log("inside TaskView")
    console.log(updatedTask)

    return (
    <>
        <Table className='mt-5' style={{borderColor:'black',color:'white'}}>
            <thead>
                <tr style={{color:'white'}}>
                    <th className='text-light'>#</th>
                    <th className='text-light'>Task</th>
                    <th className='text-light'>Description</th>
                    <th className='text-light'>Status</th>
                </tr>
            </thead>
            <tbody >
                {updatedTask && updatedTask.map((item, index) => (
                    <tr  key={index} >
                        <td className='text-light' >{index + 1}</td> 
                        <td className='text-light'>{item.taskTitle}</td>
                        <td className='text-light'>{item.taskDescription}</td>
                        <td className='text-light'>{item.remarks}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
)

}

export default TaskView
