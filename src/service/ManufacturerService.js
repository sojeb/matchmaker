import axiosInstance from "./Api";

class ManufacturerService {
    getAllManufacturer(isActive){
        console.log("all man ", 'config/manufacturer/?active='+isActive)
        return axiosInstance.get('config/manufacturer/?active='+isActive);
    }
    saveManufacturer(data) {
        data.phone = data.prefix + " " + data.phone
        return axiosInstance.post('config/manufacturer', data);
    }
    getManufacturerById(id){
        return axiosInstance.get('config/manufacturer/'+id);
    }
    updateManufacturer(id,data){
        data.phone = data.prefix + " " + data.phone
        return axiosInstance.put('config/manufacturer/'+id,data);
    }
    toogleStatus(id, status) {
        
        console.log("toogle = ", ' config/manufacturer/'+id+'?active='+status)
        return axiosInstance.patch('config/manufacturer/'+id+'?active='+status);
    }

    getAllCity(){
        return axiosInstance.get('/cities');
    }
    getAllCountry(){
        return axiosInstance.get('/countries');
    }

}

export default new ManufacturerService();