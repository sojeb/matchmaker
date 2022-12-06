import axiosInstance from "./Api";

class SupplierService {
    getAllSupplier(isActive){ 
        return axiosInstance.get('config/supplier/?active='+isActive);
    }
    saveSupplier(data) {
        data.phone = data.prefix + " " + data.phone
        console.log("Final supplier data = ", data)
        return axiosInstance.post('config/supplier', data);
    }
    getSupplierById(id){
        return axiosInstance.get('config/supplier/'+id);
    }
    updateSupplier(id,data){
        data.phone = data.prefix + " " + data.phone
        return axiosInstance.put('config/supplier/'+id,data);
    }
    toogleStatus(id, status) {
       
        console.log("b = ", 'config/supplier/'+id+'?active='+status)
        return axiosInstance.patch('config/supplier/'+id+'?active='+status);
    }

    getAllCity(){
        return axiosInstance.get('/cities');
    }
    getAllCountry(){
        return axiosInstance.get('/countries');
    }
}

export default new SupplierService();