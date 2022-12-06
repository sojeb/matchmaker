import axiosInstance from "./Api";

class WorkflowActionService {
    SaveWorkflow(value) {
        return axiosInstance.post('/workflow-actions', value);
    }

    getAllWorkflows(isActive) {
        return axiosInstance.get(`/workflow-actions/?active=${isActive}`);
    }

    singleWorkflow(id) {
        return axiosInstance.get('/workflow-actions/' + id);
    }

    updateWorkflow(id, value) {
        return axiosInstance.put('/workflow-actions/' + id, value);
    }

    toggleStatus(id, status) {
        return axiosInstance.patch(`/workflow-actions/${id}?active=${status}`);
    }

}

export default new WorkflowActionService();