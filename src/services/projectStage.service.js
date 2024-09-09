import Http from './http';

class projectStage  {

    getProjectStage(projectId) {
        return Http.get(`Admin/Project/GetAllStagesByProjectId?projectId=${projectId}`)
    }

    cretaeProjectSatge(data) {
        return Http.post(`Admin/Project/CreateStage`,data)
    }

    editProjectStageData(data) {
        return Http.get(`Admin/Project/GetProjectStageById?projectStageId=${data}`)
    }

    deleteProjectStage(data) {
        return Http.delete(`Admin/Project/DeleteStage?projectStageId=${data}`)
    }

    duplicateStageRecored(data) {
        return Http.get(`Admin/Project/DuplicateStage?projectStageId=${data}`)
    }

    orderStage(data){
        return Http.post(`Admin/Project/OrderStage`, data)
    }
}

export default new projectStage();