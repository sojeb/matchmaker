import axiosInstance from './Api';

class DepartmentService {
    getAllDepartment(isActive) {
        return axiosInstance.get( `/department?active=${isActive}`);
    }
}

export default new DepartmentService();
