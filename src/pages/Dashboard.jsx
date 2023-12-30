import React, { useEffect, useState } from 'react'
import Add from '../components/Add'
import View from '../components/View'
import { displayUser } from '../services/allAPI'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
const navigate = useNavigate()
    const [uploadProjectStatus,setUploadProjectStatus]= useState({})
    const userId = localStorage.getItem('userId');
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        id: ""
    });
    // Fetch user details
    const getUserData = async (userId) => {
        const response = await displayUser(userId);
        const { data } = response;
        setUserData(data);
    };
    useEffect(() => {
        getUserData(userId);
    }, [userId]);

function logout(){
    navigate('/')
    localStorage.removeItem('userId')

}
    return (
        <div className='container'>
            <header>
                <div className='d-flex align-items-center justify-content-between mt-5'>
                    <h3>Hello <span style={{color:"yellow",fontWeight:'700',fontStyle:'italic'}}>{userData.username}</span></h3>
                    <div>
                        <button className='btn btn-info me-5'>Home</button>
                        <button className='btn btn-warning' onClick={logout}>Logout</button>
                    </div>
                </div>
            </header>
            <section>
                <div className='d-flex align-items-center justify-content-evenly'>
                    <Add userId={userId} setUploadProjectStatus={setUploadProjectStatus} />
                </div>
            </section>
            <section>
                <View  uploadProjectStatus={uploadProjectStatus} user_id={userId} />
            </section>
        </div>
    )
}
export default Dashboard;
