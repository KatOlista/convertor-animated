import styles from './CurrencyInput.module.scss';

export const CurrencyInput = ({ value, onChange }) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="0"
      value={value}
      onChange={onChange}
    />
  );
};
