import axiosInstance from "./Api";
import api from "./Api";


class TaskRecordServices {
    saveTask(values) {
        return axiosInstance.post('/task/', values);
    }

    getAllTasks(isActive) {
        return axiosInstance.get(`/task/?active=${isActive}`);
    }

    getAllModels() {
        return axiosInstance.get(`/model/`);
    }


    getTaskById(id){
        return axiosInstance.get('/task/'+id);
    }
    updateTask(id, values){
        return axiosInstance.put('/task/'+id, values);
    }
    toggleStatus(id,status) {

        console.log('id',id, status)
        return axiosInstance.patch(`/task/${id}?active=${status}`);
    }

    searchTasks( values){
        console.log('values', values)
        return api.post(`/task/search`,values );

    }



}

export default new TaskRecordServices();
