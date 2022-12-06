import axiosInstance from './Api';

class ItemDemandService {
    getAllItemDemand(isActive) {
        return axiosInstance.get(`/store-demands?active=${isActive}`);
    }
    saveItemDemand(values) {
        return axiosInstance.post('/store-demands', values);
    }
    getItemDemandById(id){
        return axiosInstance.get('/store-demands/'+id);
    }
    updateItemDemand(id,value){
        return axiosInstance.put('/store-demands/'+id,value);
    }
    toggleStatus(id,status) {
        return axiosInstance.patch(`/store-demands/${id}?active=${status}`);
    }
}

export default new ItemDemandService();
