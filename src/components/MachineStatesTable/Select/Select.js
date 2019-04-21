import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.scss'

const Select = ({ value, options, onChange }) => (
  <select className={styles.container} value={value} onChange={onChange}>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.text}</option>
    ))}
  </select>
);

Select.defaultProps = {
  value: '',
  options: [],
};

Select.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    text: PropTypes.string.isRequired,
  })),
};

export default Select;
