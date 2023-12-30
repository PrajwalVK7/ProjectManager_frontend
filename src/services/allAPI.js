import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";

// user register
export const registerUser = async (reqBody) => {
    return await commonAPI('POST', `${serverURL}user`, reqBody)
}

//login 

export const loginUser = async (reqBody) => {
    return await commonAPI('GET', `${serverURL}user`, reqBody)
}

// display user details in header
export const displayUser = async (id) => {
    return await commonAPI('GET', `${serverURL}user/${id}`, "")
}

//upload project
export const uploadProject = async (reqBody) => {
    return await commonAPI('POST', `${serverURL}projects`, reqBody)
}

//get project details

export const getProject = async (user_id) => {
    return await commonAPI('GET', `${serverURL}projects?user_id=${user_id}`, "")
}
// project

export const getProjectById = async (projectId) => {
    return await commonAPI('GET', `${serverURL}projects/${projectId}`, "");
  };
  

//to delete project

export const deleteProject = async (id) => {
    return await commonAPI('DELETE', `${serverURL}projects/${id}`)
}

// to add taks inside project

export const addTask = async (projectId, reqBody) => {
    return  await commonAPI('PUT', `${serverURL}projects/${projectId}`, reqBody);
};

// to display task details in taskView component


export const getTasks = async(projectId)=>{
    return await commonAPI('GET',`${serverURL}projects/${projectId}`)
}