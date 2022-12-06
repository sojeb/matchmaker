import axiosInstance from "./Api";

class AprrovalSettingService {
    getAllApproval() {
        return axiosInstance.get('/approval-settings');
    }
    getAllDepartment() {
        return axiosInstance.get('/department');
    }
    getAllSection() {
        return axiosInstance.get("/section");
    }
    getAllDesignation() {
        return axiosInstance.get("/designation");
    }
    getAllEmployeeList() {
        return axiosInstance.get("/employee");
    }
    saveApprovalSetting(values) {
        return axiosInstance.post('/approval-settings', values);
    }
}

export default new AprrovalSettingService();