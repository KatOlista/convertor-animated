import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { convertCurrency, DEFAULT_CURRENCIES, getItem } from '../../utils';
import { Loader, ConverterItem, Header } from '../';
import { setUpperInput } from '../../redux/features/upperInputSlice';
import { setLowerInput } from '../../redux/features/lowerInputSlice';

import styles from './CurrencyConverter.module.scss';
import bg from '../../assets/images/bg1.jpg';

export const CurrencyConverter = () => {
  gsap.registerPlugin(useGSAP);

  const converterRef = useRef(null);

  useGSAP(() => {
    gsap.timeline().from(converterRef.current, {
      y: '-200%',
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
    <section>
      <Header />

      <main className={styles.converter}>
        <img src={bg} alt="money world" className={styles.converter__bg} />
        <div ref={converterRef} className={styles.converter__content}>
          {isLoading && (
            <div className={styles.converter__loader}>
              <Loader />
            </div>
          )}

          {showError && <p>Something went wrong</p>}

          {showContent && (
            <>
              <h1 className={styles.converter__header}>Currency Converter</h1>

              <form className={styles.converter__form}>
                <ConverterItem
                  inputValue={upperInputValue}
                  setInputValue={setInputValueOnUpperInputChange}
                  setInputOnCurrencyChange={calculateInputOnUpperCurrencyChange}
                  selectedCc={selectedCurrency1}
                />

                <ConverterItem
                  inputValue={lowerInputValue}
                  setInputValue={setInputValueOnLowerInputChange}
                  setInputOnCurrencyChange={calculateInputOnLowerCurrencyChange}
                  selectedCc={selectedCurrency2}
                />
              </form>
            </>
          )}
        </div>
      </main>
    </section>
  );
};
