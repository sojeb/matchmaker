import axiosInstance from "./Api";

class UnitofMeasurementService {
    getAllUnitofMeasurement(active){
        return axiosInstance.get(`/store/unit/measurements/?active=${active}`);
    }
    saveUnitofMeasurement(values) {
        return axiosInstance.post('/store/unit/measurements', values);
    }
   
    
    getUnitofMeasurementById(id){
        return axiosInstance.get('/store/unit/measurements/'+id);
    }
    updateUnitofMeasurement(id,value){
        return axiosInstance.put('/store/unit/measurements/'+id,value);
    }

    toggleStatus(id,status) {
        return axiosInstance.patch(`/store/unit/measurements/${id}?active=${status}`);
    }
}

export default new UnitofMeasurementService();