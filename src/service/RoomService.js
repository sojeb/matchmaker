import axiosInstance from "./Api";

const DELETE_ROOM = "/store/management/room";

class RoomService {
    SaveRoom(value) {
        return axiosInstance.post('/store/management/room/', value);
    }

    getAllRoom(isActive) {
        return axiosInstance.get(`/store/management/room/?active=${isActive}`);
    }

    singleRoom(id) {
        return axiosInstance.get('/store/management/room/' + id);
    }

    updateRoom(id, value) {
        return axiosInstance.put('/store/management/room/' + id, value);
    }

    toggleStatus(id, isActive) {
        return axiosInstance.patch(`/store/management/room/${id}?active=${isActive}`);
    }

    getAllStores(isActive) {
        return axiosInstance.get(`/store/management/stores/?active=${isActive}`);
    }

    searchRoom(size,data){
        return axiosInstance.post(`/store/management/room/search/?size=${size}`, data);
    }
}

export default new RoomService();