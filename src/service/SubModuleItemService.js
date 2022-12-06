import axiosInstance from "./Api";

class SubModuleItemService {

    getAllSubModuleItems() {
        return axiosInstance.post('/item/search',{
            query: null,
            isActive:true
        });
    }

    saveSubModuleItem(values) {
        return axiosInstance.post('/item', values);
    }
    getSubModuleItemById(id){
        return axiosInstance.get('/item/'+id);
    }
    updateSubModuleItem(id,value){
        return axiosInstance.put('/item/'+id,value);
    }
    toggleStatus(id,status) {
        return axiosInstance.patch(`/item/${id}?active=${status}`);
    }
}

export default new SubModuleItemService();