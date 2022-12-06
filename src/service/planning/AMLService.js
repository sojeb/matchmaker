import API from "../Api";
const AML_COMMON_URL = 'aircraft-maintenance-log';


class AMLService {
	fetchById(id) {
		return API(`${AML_COMMON_URL}/${id}`);
	}
	
	save(data) {
		return API.post(AML_COMMON_URL, data);
	}
	
	update(id, data) {
		return API.put(`${AML_COMMON_URL}/${id}`, data);
	}
	
	toggleStatus(id, isActive) {
		console.log({ isActive: !isActive})
		return API.patch(`${AML_COMMON_URL}/${id}`, {}, { params: { active: !isActive}});
	}
}

export default new AMLService();
