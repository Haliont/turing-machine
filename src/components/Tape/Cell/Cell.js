import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Cell.module.scss';

function Cell({ digit, isActive }) {
  return (
    <div className={cn(styles.container, isActive && styles.containerIsActive)}>
      <span>{digit}</span>
    </div>
  )
}

Cell.propTypes = {
  digit: PropTypes.oneOf([0, 1]).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Cell;
