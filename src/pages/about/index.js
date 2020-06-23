import React, { useRef } from 'react';
// import CursorTrigger from '../../components/CursorTrigger/CursorTrigger';
import Link from '../../components/Link/Link';

import classnames from 'classnames';
import styles from './About.module.scss';

function About() {
  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.container)}>
        <div className={classnames(styles.imgContainer)}>
          <img className={classnames(styles.image)} src="/images/about.jpg" />
        </div>
        <div className={classnames(styles.content)}>
          <div className={classnames(styles.aboutWork)}>
            Hi! I'm Tyrell a Toronto based Full-Stack Developer. Currently working at
            <Link href="https://www.jam3.com/" message="Where I work">
              Jam3
            </Link>
          </div>
          <div className={classnames(styles.aboutPersonal)}>
            I’m Tyrell, a coffee-drinking, bicycle riding, burrito loving full-stack web developer from Toronto. Most
            recently, I can be found bouncing between front and back-end development, crafting custom Wordpress themes
            to fit my clients' every need. I enjoy collaborating with a team of talented web designers and developers to
            take complex ideas and bring them to life in fully responsive environments online.
          </div>
          <div>
            I’m Tyrell, a coffee-drinking, bicycle riding, burrito loving full-stack web developer from Toronto. Most
            recently, I can be found bouncing between front and back-end development, crafting custom Wordpress themes
            to fit my clients' every need. I enjoy collaborating with a team of talented web designers and developers to
            take complex ideas and bring them to life in fully responsive environments online.
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
