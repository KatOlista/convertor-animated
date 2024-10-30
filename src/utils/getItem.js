export const getItem = (rates, query) => rates.find(({ cc }) => cc === query);
