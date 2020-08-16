import React, { useEffect, useLayoutEffect } from 'react';
import Link from '../../components/Link/Link';
import classnames from 'classnames';
import { mouseleaveTrigger } from '../../redux/reducers/cursor';
import { setPageLoaded } from '../../redux/reducers/app';
import styles from './About.module.scss';
import { useDispatch } from 'react-redux';

function About() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mouseleaveTrigger());
    return () => dispatch(setPageLoaded(false));
  }, []);

  useLayoutEffect(() => {
    dispatch(setPageLoaded(true));
  }, []);

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.container)}>
        <div className={classnames(styles.imgContainer)}>
          <img className={classnames(styles.image)} src="/images/about.jpg" />
        </div>
        <div className={classnames(styles.content)}>
          <div className={classnames(styles.section, styles.aboutWork)}>
            Hi! I'm Tyrell a Toronto based Full-Stack Developer currently working at
            <Link href="https://www.jam3.com/" message="Where I work">
              Jam3
            </Link>
            in Toronto, Canada. I've had the chance to work on a diverse set of projects from local business to global
            brands.
          </div>
          <div className={classnames(styles.section, styles.aboutPersonal)}>
            In my freetime I can be found coding, biking, baking or brewing beer.
          </div>
          <div className={classnames(styles.section, styles.aboutLists)}>
            <div className={classnames(styles.social)}>
              <h3 className={classnames(styles.subheading)}>Socials</h3>
              <ul>
                <li className={classnames(styles.listItem)}>
                  <Link href="https://www.instagram.com/tyrellbain/">Instagram</Link>
                </li>
                <li className={classnames(styles.listItem)}>
                  <Link href="https://ca.linkedin.com/in/tyrell-bain-161634110">LinkedIn</Link>
                </li>
                <li className={classnames(styles.listItem)}>
                  <Link href="https://github.com/tyrellbain">GitHub</Link>
                </li>
              </ul>
            </div>
            <div className={classnames(styles.contact)}>
              <h3 className={classnames(styles.subheading)}>Contact</h3>
              <p>contact@tyrellbain.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
