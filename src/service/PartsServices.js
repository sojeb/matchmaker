import axiosInstance from "./Api";
import api from "./Api";


class PartsServices {
    savePart(values) {
        return axiosInstance.post('/part/', values);
    }

    getAllParts(isActive) {
        return axiosInstance.get(`/part/?active=${isActive}`);
    }

    getAllModels() {
        return axiosInstance.get(`/model/`);
    }


    getPartById(id){
        return axiosInstance.get('/part/'+id);
    }
    updatePart(id, values){
        return axiosInstance.put('/part/'+id, values);
    }
    toggleStatus(id,status) {

        console.log('id',id, status)
        return axiosInstance.patch(`/part/${id}?active=${status}`);
    }

    searchParts( values){
        console.log('values', values)
        return api.post(`/part/search`,values );

    }



}

export default new PartsServices();
