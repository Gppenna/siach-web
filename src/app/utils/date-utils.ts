import { NativeDateAdapter } from '@angular/material/core';
import moment from 'moment';

export function formatToBack(date: any) {
	return DateUtils.toBRDate(date);
}

export class DateUtils {
	/**
	 * Transforma a string em um objeto Date utilizando o padrão 'YYYY-MM-DD.
	 * @param value valor a ser transformado em Date.
	 */
	static toBRDate(value: Date): string {
		let valueString: string;
		if (value) {
			valueString = moment(value).format('YYYY-MM-DD');
		} else {
			valueString = '';
		}
		return valueString;
	}

	static toBRDateSimple(value: Date): string {
		let valueString;
		if (value) {
			if (moment(value, 'YYYY-MM-DD', true).isValid()) {
				valueString = moment(value, 'YYYY-MM-DD');
				valueString = valueString.format('DD/MM/YYYY');
			} else {
				valueString = moment(value, 'DD/MM/YYYY');
				valueString = valueString.format('DD/MM/YYYY');
			}
		} else {
			valueString = '';
		}
		return valueString;
	}
}
