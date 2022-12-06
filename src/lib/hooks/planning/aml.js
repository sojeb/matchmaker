import { useEffect, useState } from "react";
import { useAircrafts } from "./aircrafts";
import { useAirports } from "./airports";
import { useNavigate, useParams } from "react-router-dom";
import { Form, notification } from "antd";
import AMLService from "../../../service/planning/AMLService";
import { getErrorMessage } from "../../common/helpers";
import AMLConverter from "../../../converters/planning/AMLConverter";
import API from "../../../service/Api";
import { useDispatch } from "react-redux";
import { refreshPagination } from "../paginations";
import { AML_REDUX_KEY, AML_SEARCH_URL } from "../../../components/planning/aml/AMLList";
import amlFlightDataService from "../../../components/planning/aml/amlFlightDataService";
import FlightDataConverter from "../../../converters/planning/FlightDataConverter";
import { FLIGHT_DATA_REDUX_KEY, FLIGHT_DATA_SEARCH_URL } from "../../../components/planning/aml/AMLFlightDataList";

export const signatureTypes = {
	1: 'Certification for oil and fuel',
	2: 'Certification for RVSM FLT',
	3: 'Certification for ETOPS FLT',
	4: 'Certification for PFI',
	5: 'Certification for FLT'
}

export function useAMLAdd() {
	const {id} = useParams();
	const isEditForm = () => id !== undefined;
	const message = isEditForm() ? 'Successfully Updated!' : 'Successfully Saved';
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [aml, setAml] = useState({})
	const {aircrafts} = useAircrafts();
	const {airports} = useAirports();
	const [employees, setEmployees] = useState([])
	const [amls, setAmls] = useState([])
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	useEffect(() => {
		(async () => {
			const {data: {model}} = await API.get('employee')
			setEmployees(model.map(({id, name}) => ({ id, name})))
			
			const res = await API.get('aircraft-maintenance-log/all');
			setAmls([...res.data].map(({amlId, pageNo}) => ({id: amlId, name: pageNo})))
		})();
	}, [])
	
	const saveOrUpdate = async (values) => {
		const data = AMLConverter.toRequestObj(values);
		return isEditForm() ?
			await AMLService.update(id, data) :
			await AMLService.save(data);
	}
	
	
	const onFinish = async (values) => {
		try {
			setSubmitting(true);
			const { data: { id, message} } =  await saveOrUpdate(values);
			notification['success']({message})
			dispatch(refreshPagination(AML_REDUX_KEY, AML_SEARCH_URL))
			// navigate(-1);
			navigate(`../planning/aml2/edit/${id}`)
		} catch (e) {
			notification['error']({message: getErrorMessage(e)})
		} finally {
			setSubmitting(false);
		}
	}
	
	const onReset = () => {
		if(isEditForm()) {
			form.setFieldsValue({...aml});
			return;
		}
		
		form.resetFields();
	}
	
	useEffect(() => {
		if(!isEditForm()) {
			return;
		}
		
		(async () => {
			const res = await AMLService.fetchById(id);
			const data = AMLConverter.toFormObj(res.data);
			form.setFieldsValue({...data});
			setAml({...data});
		})();
	}, [])
	
	return {
		aircrafts,
		airports,
		form,
		id,
		onReset,
		onFinish,
		employees,
		amls,
		submitting
	}
}

export function useAmlFlightDataAdd() {
	const {id} = useParams();
	const { id: amlId } = useParams();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [flightData, setFlightData] = useState({})
	const { toRequestObj, toFormObj } = FlightDataConverter;
	const isEditForm = () => flightData.id;
	const message = isEditForm() ? 'Successfully Updated!' : 'Successfully Saved';
	
	console.log({ flightData })
	
	const saveOrUpdate = async (values) => {
		const data = {
			amlId,
			...toRequestObj(values)
		};
		
		return flightData.id ?
			await amlFlightDataService.update(flightData.id, data) :
		  await amlFlightDataService.save(data);
	}
	
	const onFinish = async (values) => {
		
		try {
			setSubmitting(true);
			const { data: { id, message}} = await saveOrUpdate(values);
			const res = await amlFlightDataService.fetchById(id);
			const newData = toFormObj(res.data);
			form.setFieldsValue({...newData});
			setFlightData({...newData});
			notification['success']({message})
		} catch (e) {
			notification['error']({message: getErrorMessage(e)})
		} finally {
			setSubmitting(false);
		}
	}
	
	const onReset = () => {
		if(isEditForm()) {
			form.setFieldsValue({...flightData});
			return;
		}
		
		form.resetFields();
	}
	
	useEffect(() => {
		if(!amlId) {
			return;
		}
		
		(async () => {
			try {
				let {data} = await API.get(`/flight-data/amlId/${amlId}`);
				data = toFormObj(data[0]);
				form.setFieldsValue({...data});
				setFlightData({...data});
			} catch (e) {
				console.log(e);
			}
		})();
	}, [])
	
	return {
		id,
		form,
		onFinish,
		onReset,
		isEdit: !!flightData.id,
		submitting
	}
}

export function useAmls() {
	const [amls, setAmls] = useState([]);
	
	useEffect(() => {
		(async () => {
			const res = await API.get('aircraft-maintenance-log/all');
			setAmls([...res.data].map(({amlId, pageNo}) => ({id: amlId, name: pageNo})))
		})();
	}, [])
	
	return {
		amls
	}
}