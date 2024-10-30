import { DEFAULT_CURRENCIES } from '../../utils/';

import styles from './RateItem.module.scss';

export const RateItem = ({ rate }) => {
  return (
    <li className={styles.item}>
      <h2 className={styles.item__title}>{rate.cc}:</h2>
      <p className={styles.item__amount}>
        {rate.rate} {DEFAULT_CURRENCIES.uah}
      </p>
    </li>
  );
};
