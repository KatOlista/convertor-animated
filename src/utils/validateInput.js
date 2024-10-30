import { regexpNotNumber } from './constants';

export const validateInput = (value) => {
  let checkedValue = value.replace(regexpNotNumber, '');

  if (Number(checkedValue) < 0) {
    return '';
  }

  if (checkedValue.startsWith('0')) {
    checkedValue = value.length === 1 ? value : value.slice(1);
  }

  return checkedValue;
};
