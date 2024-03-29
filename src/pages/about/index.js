import React, { useEffect, useLayoutEffect } from 'react';
import Head from 'next/head';
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
      <Head>
        <title>About | Tyrell Bain</title>
        <meta name="description" content="Tyrell Bain is a Full Stack Developer based in Toronto, Canada."></meta>
      </Head>
      <div className={classnames(styles.container)}>
        <div className={classnames(styles.imgContainer)}>
          <img className={classnames(styles.image)} src="/images/about.jpg" />
        </div>
        <div className={classnames(styles.content)}>
          <div className={classnames(styles.section, styles.aboutWork)}>
            <p className={classnames(styles.section)}>
              Hey, I’m Tyrell, a Toronto-based Tech Lead with a solid background in computer science and languages such
              as PHP, React, Python, Node, Typescript, Flow and Hacklang.
            </p>
            <p className={classnames(styles.section)}>
              For the past seven years, I've worked as a development lead at companies such as Jam3 and Properly on
              projects for global brands like Facebook, Oculus and a diverse list of clients. As a certified scrum
              master, I really enjoy collaborating with a team of talented designers and developers to take complex
              ideas from concept to production online.
            </p>
            <p className={classnames(styles.section)}>
              When I'm not coding, I spend my time cycling or making my own beer and hot sauce.
            </p>
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
              <p>tyrellbaindev@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
