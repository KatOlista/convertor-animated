import { uahRate } from './constants';

export const getFilteredRates = (rates) => {
  return [...rates, uahRate].filter(
    ({ cc }) =>
      cc !== 'XDR' &&
      cc !== 'XAU' &&
      cc !== 'XAG' &&
      cc !== 'XPT' &&
      cc !== 'XPD',
  );
};
