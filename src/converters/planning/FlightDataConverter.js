import DateTimeConverter from "../DateTimeConverter";

export default class FlightDataConverter {
	static toRequestObj({ blockOnTime, blockOffTime, landingTime, takeOffTime, commencedTime, completedTime, ...rest}) {
		return {
			...rest,
			blockOnTime: DateTimeConverter.momentDateTimeToString(blockOnTime),
			blockOffTime: DateTimeConverter.momentDateTimeToString(blockOffTime),
			landingTime: DateTimeConverter.momentDateTimeToString(landingTime),
			takeOffTime: DateTimeConverter.momentDateTimeToString(takeOffTime),
			commencedTime: DateTimeConverter.momentDateTimeToString(commencedTime),
			completedTime: DateTimeConverter.momentDateTimeToString(completedTime)
		}
	}
	
	static toFormObj({ blockOnTime, blockOffTime, landingTime, takeOffTime, commencedTime, completedTime, ...rest }) {
		return {
			...rest,
			blockOnTime: DateTimeConverter.stringToMomentDateTime(blockOnTime),
			blockOffTime: DateTimeConverter.stringToMomentDateTime(blockOffTime),
			landingTime: DateTimeConverter.stringToMomentDateTime(landingTime),
			takeOffTime: DateTimeConverter.stringToMomentDateTime(takeOffTime),
			commencedTime: DateTimeConverter.stringToMomentDateTime(commencedTime),
			completedTime: DateTimeConverter.stringToMomentDateTime(completedTime)
		}
	}
}