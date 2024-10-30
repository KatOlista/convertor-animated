import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { RateItem } from '..';
import { DEFAULT_CURRENCIES } from '../../utils/';

import styles from './RateList.module.scss';

export const RateList = ({ rates }) => {
  gsap.registerPlugin(useGSAP);

  const listRef = useRef(null);

  useGSAP(() => {
    gsap
      .timeline()
      .from(listRef.current, {
        x: '100%',
        duration: 1,
      });
  });

  const filteredRates = rates.filter(
    ({ cc }) => cc === DEFAULT_CURRENCIES.usd || cc === DEFAULT_CURRENCIES.eur,
  );

  return (
    <ul ref={listRef} className={styles.rates}>
      {filteredRates.map((rate) => (
        <RateItem key={rate.cc} rate={rate} />
      ))}
    </ul>
  );
};
