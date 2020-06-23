import Link from '../Link/Link';
import PropTypes from 'prop-types';
import React from 'react';

import classnames from 'classnames';
const { links } = require('../../data/menu.json');
import styles from './Menu.module.scss';
import useMousePosition from '../../hooks/useMousePosition';

function Menu({ onClick }) {
  const position = useMousePosition();
  const leftPosition = Math.abs(position.xPercent - 100);
  const topPosition = -((position.yPercent - 50) / 50) * 10 + 50;

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.container)}>
        {links.map((link, i) => (
          <div className={classnames(styles.item)} key={link.slug}>
            <Link href={`/${link.slug}`} className={classnames(styles.link)} onClick={onClick}>
              <span>{link.name}</span>
              <span className={classnames(styles.pageCount)}>{(i + 1).toString().padStart(3, 0)}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

Menu.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Menu;
