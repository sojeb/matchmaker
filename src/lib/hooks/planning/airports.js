import { useEffect, useState } from "react";
import AirportService from "../../../service/AirportService";

export function useAirports() {
	const [airports, setAirports] = useState([]);
	
	useEffect(() => {
		(async () => {
			const res = await AirportService.getAllAirport();
			setAirports(res.data.map(({id, iataCode}) => ({id, name: iataCode})))
		})();
	}, [])
	
	return {
		airports
	}
}