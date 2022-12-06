import axiosInstance from "./Api";

class RackRowBinService {
    SaveRackRowBin(value) {
        return axiosInstance.post('/store/management/rack/row/bin', value);
    }

    getAllRackRowBIn(isActive) {
        return axiosInstance.get(`/store/management/rack/row/bin/?active=${isActive}`);
    }

    singleRackRowBin(id) {
        return axiosInstance.get('/store/management/rack/row/bin/' + id);
    }

    updateRackRowBin(id, value) {
        return axiosInstance.put('/store/management/rack/row/bin/' + id, value);
    }

    toggleStatus(id, status) {
        return axiosInstance.patch(`/store/management/rack/row/bin/${id}?active=${status}`);
    }
}

export default new RackRowBinService();