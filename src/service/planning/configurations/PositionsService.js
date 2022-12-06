import api from "../../Api";

const SAVE_POSITION = "/position";
const ALL_POSITIONS = "/position"
const SINGLE_POSITION = "/position/"
const UPDATE_POSITION = "/position/"

class PositionsService {
  savePosition(values) {
    console.log(SAVE_POSITION, values);
    return api.post(SAVE_POSITION, values);
  }

  getAllPositions(active, currentPage) {
    return api.get(`/position/?active=${active}&page=${currentPage}&size=10`);
  }

  getSinglePosition(id) {
    return api.get(SINGLE_POSITION + id);
  }

  updatePosition(id, values) {
    return api.put(UPDATE_POSITION + id, values);
  }

  toggleStatus(id, isActive) {
    return api.patch(`position/${id}?active=${isActive}`);
  }
}

export default new PositionsService();
