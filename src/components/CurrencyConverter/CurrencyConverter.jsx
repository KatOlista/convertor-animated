import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { convertCurrency, DEFAULT_CURRENCIES, getItem } from '../../utils';
import { Loader, ConverterForm } from '../';
import { setUpperInput } from '../../redux/features/upperInputSlice';
import { setLowerInput } from '../../redux/features/lowerInputSlice';

import styles from './CurrencyConverter.module.scss';

export const CurrencyConverter = () => {
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap
      .timeline()
      .from(`.${styles.converter__header}`, {
        x: '20%',
        opacity: 0,
        delay: 2,
        duration: 1,
      })
      .from(`.${styles.converter__error}`, {
        x: '20%',
        opacity: 0,
        delay: 2,
        duration: 1,
      });
  });

  const dispatch = useDispatch();
  const { upperInputValue } = useSelector((state) => state.upperInputValue);
  const { lowerInputValue } = useSelector((state) => state.lowerInputValue);
  const { isLoading, hasError, rates } = useSelector(
    (state) => state.currentRates,
  );

  const showError = !isLoading && hasError;
  const showContent = !isLoading && !hasError;

  const [selectedCurrency1, setSelectedCurrency1] = useState(
    DEFAULT_CURRENCIES.usd,
  );
  const [selectedCurrency2, setSelectedCurrency2] = useState(
    DEFAULT_CURRENCIES.uah,
  );

  const selectedUpperCurrency = getItem(rates, selectedCurrency1);
  const selectedLowerCurrency = getItem(rates, selectedCurrency2);

  const setInputValueOnUpperInputChange = (value) => {
    const calculatedValue = convertCurrency(
      value,
      selectedUpperCurrency.rate,
      selectedCurrency1,
      selectedLowerCurrency.rate,
      selectedCurrency2,
    );

    dispatch(setUpperInput(value));
    dispatch(setLowerInput(calculatedValue));
  };

  const setInputValueOnLowerInputChange = (value) => {
    const calculatedValue = convertCurrency(
      value,
      selectedLowerCurrency.rate,
      selectedCurrency2,
      selectedUpperCurrency.rate,
      selectedCurrency1,
    );

    dispatch(setLowerInput(value));
    dispatch(setUpperInput(calculatedValue));
  };

  const calculateInputOnUpperCurrencyChange = (selectedCurrency) => {
    const selectedUpperCurrency = getItem(rates, selectedCurrency);

    const calculatedValue = convertCurrency(
      upperInputValue,
      selectedUpperCurrency.rate,
      selectedCurrency,
      selectedLowerCurrency.rate,
      selectedCurrency2,
    );

    setSelectedCurrency1(selectedCurrency);
    dispatch(setLowerInput(calculatedValue));
  };

  const calculateInputOnLowerCurrencyChange = (selectedCurrency) => {
    const selectedLowerCurrency = getItem(rates, selectedCurrency);

    const calculatedValue = convertCurrency(
      lowerInputValue,
      selectedLowerCurrency.rate,
      selectedCurrency,
      selectedUpperCurrency.rate,
      selectedCurrency1,
    );

    setSelectedCurrency2(selectedCurrency);
    dispatch(setUpperInput(calculatedValue));
  };

  return (
    <main className={styles.converter}>
      <div className={styles.converter__content}>
        <h1 className={styles.converter__header}>Currency Converter</h1>

        {isLoading && (
          <div className={styles.converter__loader}>
            <Loader />
          </div>
        )}

        {showError && (
          <p className={styles.converter__error}>Something went wrong</p>
        )}

        {showContent && (
          <ConverterForm
            upperInputValue={upperInputValue}
            lowerInputValue={lowerInputValue}
            selectedCurrency1={selectedCurrency1}
            selectedCurrency2={selectedCurrency2}
            setInputValueOnUpperInputChange={setInputValueOnUpperInputChange}
            setInputValueOnLowerInputChange={setInputValueOnLowerInputChange}
            calculateInputOnUpperCurrencyChange={
              calculateInputOnUpperCurrencyChange
            }
            calculateInputOnLowerCurrencyChange={
              calculateInputOnLowerCurrencyChange
            }
          />
        )}
      </div>
    </main>
  );
};
