const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

export const getRates = () => {
  return new Promise((resolve) => setTimeout(resolve, 700))
    .then(() => fetch(url))
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};
