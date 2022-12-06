import DateTimeConverter from "../DateTimeConverter";

export default class AMLConverter {
	static toRequestObj(data) {
		return {
			...data,
			pfiTime: DateTimeConverter.momentDateTimeToString(data.pfiTime),
			ocaTime: DateTimeConverter.momentDateTimeToString(data.ocaTime),
			date: DateTimeConverter.momentDateToString(data.date)
		}
	}
	
	static toFormObj({ pfiTime, ocaTime, date, signatureList, ...rest}) {
		return {
			...rest,
			pfiTime: DateTimeConverter.stringToMomentDateTime(pfiTime),
			ocaTime: DateTimeConverter.stringToMomentDateTime(ocaTime),
			date: DateTimeConverter.stringToMomentDate(date),
			maintenanceLogSignatureDtoList: signatureList.map(({ signatureId, signatureType, amlSignatureId}) => ({
				signatureId,
				signatureType,
				amlSignatureId
			}))
		}
	}
}