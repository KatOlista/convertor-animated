import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import styles from './Footer.module.scss';

export const Footer = () => {
  gsap.registerPlugin(useGSAP);

  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.timeline().from(footerRef.current, {
      opacity: 0,
      duration: 1,
    });
  });

  return (
    <footer ref={footerRef} className={styles.footer}>
      <a
        href="https://katolista.github.io/KatOlista-portfolio/"
        className={styles.footer__link}
        target="_blank"
      >
        @KatOlista&nbsp;
      </a>
      2024
    </footer>
  );
};
