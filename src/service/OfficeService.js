import axiosInstance from './Api';

const BASE_URL = '/store-management/office/';
const GET_SEARCH_URL = '/store-management/office/search';

class OfficeService {
  saveStore(data) {
    return axiosInstance.post(BASE_URL, data);
  }

  getAllStores(size, data) {
    return axiosInstance.post(GET_SEARCH_URL + 'page=0&size=' + size, data);
  }

  getStoreById(id) {
    return axiosInstance.get(BASE_URL + id);
  }

  toggleStoreStatus(id, status) {
    return axiosInstance.patch(BASE_URL + id + '?active=' + status);
  }

  updateStore(id, data) {
    return axiosInstance.put(BASE_URL + id, data);
  }
}

export default new OfficeService();
