import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tape.module.scss';
import Cell from './Cell';

function Tape({ cells, currentCellId }) {
  return (
    <div className={styles.container}>
      {cells.map(({ id, digit }) => <Cell key={id} digit={digit} isActive={id === currentCellId} />)}
    </div>
  )
}

Tape.defaultProps = {
  cells: [],
  currentCellId: null,
};

Tape.propTypes = {
  cells: PropTypes.array.isRequired,
  currentCellId: PropTypes.number.isRequired,
}

export default Tape;
