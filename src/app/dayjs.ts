import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ptbr from 'dayjs/locale/pt-br';

dayjs.extend(customParseFormat);

export const $dayjs = dayjs;

export const parseStringToDate = (str: string): Date => dayjs(str).toDate();

export const formatDate = (date: Dayjs, template = 'DD MMM YYYY') => date.locale(ptbr).format(template);

export const formatDateFromString = (dateStr: string, inputFormat: string, outputFormat = 'DD/MM/YYYY, HH:mm') =>
  dayjs(dateStr, inputFormat, 'pt-br').format(outputFormat);

