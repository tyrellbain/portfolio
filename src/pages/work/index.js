import React, { useRef } from 'react';
import SVGText from '../../components/SVGText/SVGText';

import classnames from 'classnames';
const { works } = require('../../data/work.json');

function Work() {
  return (
    <div>
      I've worked on neat project for the following companies,
      {works.map((work) => (
        <span> {work.name}, </span>
      ))}
    </div>
  );
}

export default Work;
