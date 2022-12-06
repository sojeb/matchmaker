import { useEffect } from "react";
import DateTimeConverter from "../../converters/DateTimeConverter";

export const DATE_TIME_DISPLAY_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const isTruthy = v => !!v;

export function useConditionalEffect(callBack,  deps = [], conditions = []) {
	if (typeof callBack !== 'function') throw "Callback should be a function";
	
	if (!Array.isArray(conditions)) throw "Condition must be of type array";
	
	if (!Array.isArray(deps)) throw "Dependency must be of type array";
	
	useEffect(() => {
		
		if (!conditions.every(isTruthy)) return;
		
		callBack();
		
	}, [deps])
}

export const dateFormat = (dateTime, formatter = DATE_TIME_DISPLAY_FORMAT) => {
	try {
		return DateTimeConverter.stringToMomentDateTime(dateTime)?.format(formatter)
	} catch (e) {
		return '';
	}
}