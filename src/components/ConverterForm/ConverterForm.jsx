import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { ConverterItem } from '../ConverterItem/ConverterItem';

import styles from './ConverterForm.module.scss';

export const ConverterForm = ({
  upperInputValue,
  lowerInputValue,
  selectedCurrency1,
  selectedCurrency2,
  setInputValueOnUpperInputChange,
  setInputValueOnLowerInputChange,
  calculateInputOnUpperCurrencyChange,
  calculateInputOnLowerCurrencyChange
}) => {
  gsap.registerPlugin(useGSAP);

  const formRef = useRef();

  useGSAP(() => {
    gsap.from(formRef.current, {
        y: '-20%',
        opacity: 0,
        duration: 1,
      })
  });

  return (
    <form ref={formRef} className={styles.form}>
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
  )
}
