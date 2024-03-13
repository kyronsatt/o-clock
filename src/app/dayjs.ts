import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ptbr from "dayjs/locale/pt-br";

dayjs.extend(customParseFormat);

export const $dayjs = dayjs;

export const parseStringToDate = (str: string): Date => dayjs(str).toDate();

export const formatDate = (date: Date, template = "DD MMM YYYY") =>
  dayjs(date).locale(ptbr).format(template);

export const formatDateFromString = (
  dateStr: string,
  outputFormat = "DD/MM/YYYY, HH:mm",
  inputFormat = undefined
) => dayjs(dateStr, inputFormat, "pt-br").format(outputFormat);
