import { CurrencySelect, CurrencyInput } from '..';
import { validateInput } from '../../utils';

import styles from './ConverterItem.module.scss';

export const ConverterItem = ({
  inputValue,
  setInputValue,
  setInputOnCurrencyChange,
  selectedCc,
}) => {
  const changeInputValueHandler = (e) => {
    setInputValue(validateInput(e.target.value));
  };

  const changeSelectHandler = (e) => {
    setInputOnCurrencyChange(e.target.value);
  };

  return (
    <div className={styles.item}>
      <CurrencySelect value={selectedCc} onChange={changeSelectHandler} />

      <CurrencyInput value={inputValue} onChange={changeInputValueHandler} />
    </div>
  );
};
