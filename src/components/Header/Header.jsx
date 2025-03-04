import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useSelector } from 'react-redux';

import { RateList, Loader } from '..';

import styles from './Header.module.scss';

import Logo from '../../assets/icons/currency-exchange.svg?react';

export const Header = () => {
  gsap.registerPlugin(useGSAP);

  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: '-100%',
      opacity: 0,
      delay: 2,
      duration: 1,
    });
  });

  const { isLoading, hasError, rates } = useSelector(
    (state) => state.currentRates,
  );

  const showError = !isLoading && hasError;
  const showContent = !isLoading && !hasError && !!rates.length;

  return (
    <header ref={headerRef} className={styles.header}>
      <a aria-label="logo" href="./" className={styles.header__link}>
        <Logo className={styles.header__logo} />
      </a>

      {isLoading && (
        <div className={styles.header__loader}>
          <Loader />
        </div>
      )}

      {showError && <p>Something went wrong</p>}

      {showContent && <RateList rates={rates} />}
    </header>
  );
};
