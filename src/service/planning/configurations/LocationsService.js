import api from "../../Api";

const SAVE_LOCATION = "/aircraft-location/";
const GET_SINGLE_LOCATION = "/aircraft-location/";
const UPDATE_LOCATION = "/aircraft-location/";

class LocationsService {
  saveLocation(values) {
    return api.post(SAVE_LOCATION, values);
  }

  getAllLocations(isActive, currentPage) {
    return api.get(`/aircraft-location?active=${isActive}&page=${currentPage}&size=10`);
  }

  getSingleLocation(id) {
    return api.get(GET_SINGLE_LOCATION + id);
  }

  updateLocation(id, values) {
    return api.put(UPDATE_LOCATION + id, values);
  }

  toggleStatus(id, isActive) {
    return api.patch(`aircraft-location/${id}?active=${isActive}`);
  }
}

export default new LocationsService();
