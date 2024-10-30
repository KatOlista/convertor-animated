import { useSelector } from 'react-redux';

import styles from './CurrencySelect.module.scss';

export const CurrencySelect = ({ value, onChange }) => {
  const { rates } = useSelector((state) => state.currentRates);

  return (
    <select value={value} onChange={onChange} className={styles.select}>
      {rates.map((rate) => (
        <option key={rate.cc} className={styles.select__option} value={rate.cc}>
          {rate.txt} {rate.cc}
        </option>
      ))}
    </select>
  );
};
