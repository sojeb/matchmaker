import axiosInstance from "./Api";

class RackRowService {
    SaveRackRow(value) {
        return axiosInstance.post('/store/management/rack/row/', value);
    }

    getAllRackRow(isActive) {
        return axiosInstance.get(`/store/management/rack/row/?active=${isActive}`);
    }

    singleRackRow(id) {
        return axiosInstance.get('/store/management/rack/row/' + id);
    }

    updateRackRow(id, value) {
        return axiosInstance.put('/store/management/rack/row/' + id, value);
    }

    toggleStatus(id, status) {
        return axiosInstance.patch(`/store/management/rack/row/${id}?active=${status}`);
    }
}

export default new RackRowService();