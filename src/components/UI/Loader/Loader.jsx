import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import styles from './Loader.module.scss';

import LoaderIcon from '../../../assets/icons/circles-loader.svg?react';

export const Loader = () => {
  gsap.registerPlugin(useGSAP);

  const loaderRef = useRef(null);

  useGSAP(() => {
    gsap.from(loaderRef.current, {
      y: '-40%',
      opacity: 0,
      delay: 2,
      duration: 1,
    });
  });

  return (
    <div ref={loaderRef} className={styles.loader}>
      <LoaderIcon className={styles.loader__icon} />
    </div>
  );
};
