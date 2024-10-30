import { DEFAULT_CURRENCIES } from './constants';

const getRounded = (num) => {
  return Math.floor(num * 100) / 100;
};

export const convertCurrency = (amount, rate1, currency1, rate2, currency2) => {
  if (currency1 === currency2) {
    return amount;
  }

  if (currency1 === DEFAULT_CURRENCIES.uah) {
    return getRounded(amount / rate2);
  }

  if (currency2 === DEFAULT_CURRENCIES.uah) {
    return getRounded(amount * rate1);
  }

  return getRounded((amount * rate1) / rate2);
};
