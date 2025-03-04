import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { CurrencyConverter, Footer, Header } from './components';
import {
  setRates,
  setRatesLoading,
  setRatesError,
} from './redux/features/ratesSlice';

import { getFilteredRates, getRates } from './utils';

import './App.scss';
import dollar from './assets/images/1.webp';

export const App = () => {
  gsap.registerPlugin(useGSAP);

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap
      .timeline()
      .fromTo(
        '.app',
        {
          transform: 'scale(2) translateY(15%)',
        },
        {
          transform: 'scale(1) translateY(0)',
          duration: 2,
        },
      )
      .from('.app__dollar0', {
        y: '-600%',
        rotate: '-=360',
        delay: 2,
        duration: 5,
      });
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRatesLoading(true));

    getRates()
      .then((ratesFromServer) => {
        const rates = getFilteredRates(ratesFromServer);
        dispatch(setRates(rates));
      })
      .catch(() => {
        dispatch(setRatesError(true));
      })
      .finally(() => {
        dispatch(setRatesLoading(false));
      });
  }, []);

  return (
    <div className="app">
      <img
        ref={imgRef}
        src={dollar}
        alt="dollar"
        className="app__dollar app__dollar0"
      />

      <Header />

      <CurrencyConverter />

      <Footer />
    </div>
  );
};
