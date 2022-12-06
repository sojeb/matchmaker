import axiosInstance from "./Api";

class RackService {
    SaveRack(value) {
        return axiosInstance.post('/store/management/rack/', value);
    }

    getAllRack(isActive) {
        return axiosInstance.get(`/store/management/rack/?active=${isActive}`);
    }

    singleRack(id) {
        return axiosInstance.get('/store/management/rack/' + id);
    }

    updateRack(id, value) {
        return axiosInstance.put('/store/management/rack/' + id, value);
    }

    toggleStatus(id, status) {
        return axiosInstance.patch(`/store/management/rack/${id}?active=${status}`);
    }
    searchRack(size,data) {
        return axiosInstance.get(`/store/management/rack/search/?active=${size}`);
    }

}

export default new RackService();