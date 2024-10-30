
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
import dollar from './assets/images/1.png';

export const App = () => {
  gsap.registerPlugin(useGSAP);

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap
      .timeline()
      .from('.app__dollar0', {
        y: '-600%',
        rotate: '-=360',
        duration: 5,
      })
      .from('.app__dollar1', {
        y: '-600%',
        rotate: '-=360',
        duration: 5,
      })
      .from('.app__dollar2', {
        y: '-600%',
        rotate: '-=360',
        duration: 5,
      })
      .from('.app__dollar3', {
        y: '-600%',
        rotate: '-=360',
        duration: 5,
      })
      .from('.app__dollar4', {
        y: '-600%',
        rotate: '-=360',
        duration: 5,
      });
  }, {scope: imgRef});

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
    <div ref={imgRef} className='app'>
      <img ref={imgRef} src={dollar} alt="dollar" className='app__dollar app__dollar0'/>
      <img ref={imgRef} src={dollar} alt="dollar" className='app__dollar app__dollar1'/>
      <img ref={imgRef} src={dollar} alt="dollar" className='app__dollar app__dollar2'/>
      <img ref={imgRef} src={dollar} alt="dollar" className='app__dollar app__dollar3'/>
      <img ref={imgRef} src={dollar} alt="dollar" className='app__dollar app__dollar4'/>

      <Header />

      <CurrencyConverter />

      <Footer />
    </div>
  );
};
