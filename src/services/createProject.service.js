import Http from './http';

class createProjectService {

  createProject(data) {
    return Http.post('Admin/Project/CreateProject', data)
  }

  projectList(data) {
    return Http.post('Admin/Project/GetAllProjects', data)
  }

  GetProjectById(projectId) {
    return Http.get(`Admin/Project/GetProjectById?projectId=${projectId}`)
  }
  
  deleteProject(params) {
    return Http.delete('Admin/Project/DeleteProject', params)
  }

  duplicateProject(params) {
    return Http.getwithparams('Admin/Project/DuplicateProject', params)
  }

  projectStatusChange(projectId) {
    return Http.get(`Admin/Project/ActiveDeactiveProject?projectId=${projectId}`)
  }

}

export default new createProjectService();