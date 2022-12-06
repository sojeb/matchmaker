import axios from "axios";
import { getJWTToken } from "../lib/common/helpers";

const API = axios.create({
	//  baseURL: 'http://52.77.31.52:8080/api',
	baseURL: 'http://localhost:8081/api',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})

API.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${getJWTToken()}`;
  return config;
});

export default API;
