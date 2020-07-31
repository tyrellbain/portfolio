import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Link from '../Link/Link';
import React from 'react';
import classnames from 'classnames';
const { links } = require('../../data/menu.json');
import { setMenuOpen } from '../../redux/reducers/app';
import { mouseleaveTrigger } from '../../redux/reducers/cursor';
import styles from './Menu.module.scss';
import useMousePosition from '../../hooks/useMousePosition';

const SHUTTER_COUNT = 8;

function Menu() {
  const menuOpen = useSelector((state) => state.app.menuOpen);
  const dispatch = useDispatch();

  const createShutters = () => {
    const shutters = [];
    for (let i = 0; i < SHUTTER_COUNT; i++) {
      shutters.push(
        <div
          className={classnames(styles.shutter)}
          style={{ left: `${i * (100 / SHUTTER_COUNT)}%` }}
          key={`shutter-${i}`}
        />
      );
    }
    return shutters;
  };

  return (
    <CSSTransition
      classNames={{
        enterActive: styles.animateInActive,
        enter: styles.animateIn,
        exit: styles.animateOut,
      }}
      in={menuOpen}
      timeout={500}
      unmountOnExit
    >
      <div className={classnames(styles.root)}>
        {createShutters()}
        <div className={classnames(styles.container)}>
          {links.map((link, i) => (
            <div className={classnames(styles.item)} key={link.slug}>
              <Link
                href={`/${link.slug}`}
                className={classnames(styles.link)}
                onClick={() => {
                  dispatch(setMenuOpen(!menuOpen));
                  dispatch(mouseleaveTrigger());
                }}
                style={{ transitionDelay: `${(i + 1) * 0.067}s` }}
              >
                <span>{link.name}</span>
                <span className={classnames(styles.pageCount)}>{(i + 1).toString().padStart(3, 0)}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </CSSTransition>
  );
}

export default Menu;
