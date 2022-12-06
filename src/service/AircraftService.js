import axiosInstance from "./Api";

const BASE_URL = "/aircrafts/";

class AircraftService {
  saveAircraft(data) {
    return axiosInstance.post(BASE_URL, data);
  }

  getAllAircraft(status) {
    return axiosInstance.get(BASE_URL + "?active=" + status + "&size=60");
  }

  getAircraftById(id) {
    return axiosInstance.get(BASE_URL + id);
  }

  updateAircraft(id, data) {
    return axiosInstance.put(BASE_URL + id, data);
  }

  toggleAircraftStatus(id, status) {
    return axiosInstance.patch(BASE_URL + id + "?active=" + status);
  }
}

export default new AircraftService();
