import axiosInstance from '../Api';

class RequestforQuotationService {
  getAllRequestforQuotation(size, data) {
    return axiosInstance.post(`/quote-requests/search?page=0&size=${size}`, data);
  }

  saveRequestforQuotation(values) {
    return axiosInstance.post('/quote-requests', values);
  }

  getRequestforQuotationById(id) {
    return axiosInstance.get('/quote-requests/' + id);
  }

  updateRequestforQuotation(id, value) {
    return axiosInstance.put('/quote-requests/' + id, value);
  }

  toggleStatus(id, status) {
    return axiosInstance.patch(`/quote-requests/${id}?active=${status}`);
  }
}

export default new RequestforQuotationService();
