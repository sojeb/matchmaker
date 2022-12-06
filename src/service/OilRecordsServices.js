import axiosInstance from "./Api";
import api from "./Api";


class OilRecordsServices {
    saveOilRecord(values) {
        return axiosInstance.post('/oil-record', values);
    }

    getOilRecordById(id){
        return axiosInstance.get('/oil-record/'+id);
    }
    updateOilRecord(id,values){
        return axiosInstance.put('/oil-record/'+id,values);
    }
    toggleStatus(id,status) {

        console.log('id',id, status)
        return axiosInstance.patch(`/oil-record/${id}?active=${status}`);
    }

    findOilRecord( values){
        console.log('values', values)
        return api.post(`oil-record/find`,values );

    }

    getAllAml (){
        return api.get(`aircraft-maintenance-log`)

    }



}

export default new OilRecordsServices();
