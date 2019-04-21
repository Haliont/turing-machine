import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import * as constants from '../../constants';
import styles from './MachineStatesTable.module.scss'

import Select from './Select';

const Cell = ({ children }) => <div className={styles.cell}>{children}</div>;
const Row = ({ children, className }) => (
  <div className={cn(styles.row, className && className)}>
    {children}
  </div>
);

const renderMachineStateRow = ({ name, isActive, type, moveTo, switchTo, write, onChange, machineStateNames }) => (
  <Row className={cn(isActive && styles.rowIsActive)}>
    <Cell>{name}</Cell>
    <Cell>{type}</Cell>
    <Cell>
      <Select
        value={write}
        options={[
          { value: constants.ONE, text: '1' },
          { value: constants.ZERO, text: '0' },
        ]}
        onChange={({ target }) => onChange({ newValue: +target.value, machineStateName: name, machineStateType: type, fieldName: 'write' })}
      />
    </Cell>
    <Cell>
      <Select
        value={moveTo}
        options={[
          { value: '', text: 'На месте' },
          { value: constants.MOVE_LEFT, text: 'Влево' },
          { value: constants.MOVE_RIGHT, text: 'Вправо' },
        ]}
        onChange={({ target }) => onChange({ newValue: target.value, machineStateName: name, machineStateType: type, fieldName: 'moveTo' })}
      />
    </Cell>
    <Cell>
      <Select
        value={switchTo}
        options={[
          { value: '', text: 'Не выбрано' },
          ...machineStateNames.map((name) => ({ value: name, text: name }))
        ]}
        onChange={({ target }) => onChange({ newValue: target.value, machineStateName: name, machineStateType: type, fieldName: 'switchTo' })}
      />
    </Cell>
  </Row>
);

function MachineStatesTable({
  currentMachineStateType,
  currentMachineStateName,
  onChangeControl,
  machineStates,
  isDisabled,
}) {
  const machineStateNames = machineStates.map(({ name }) => name);

  return (
    <div className={cn(styles.container, isDisabled && styles.containerIsDisabled)}>
      <div className={styles.overlay}/>
      <div className={styles.table}>
        <Row>
          <Cell>Состояние</Cell>
          <Cell>Прочитать</Cell>
          <Cell>Записать</Cell>
          <Cell>Двигаться</Cell>
          <Cell>Переключить в состояние</Cell>
        </Row>
        {machineStates.map(({ name, [constants.STATE_ZERO]: zero, [constants.STATE_ONE]: one }) => {
          const rowProps = { machineStateNames, name, onChange: onChangeControl };
          const isActiveMachineState = name === currentMachineStateName;
          const isActiveZero = isActiveMachineState && currentMachineStateType === constants.STATE_ZERO;
          const isActiveOne = isActiveMachineState && currentMachineStateType === constants.STATE_ONE;

          return (
            <React.Fragment key={name}>
              {renderMachineStateRow({
                type: constants.STATE_ZERO, isActive: isActiveZero, ...rowProps, ...zero,
              })}
              {renderMachineStateRow({
                type: constants.STATE_ONE, isActive: isActiveOne, ...rowProps, ...one,
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

MachineStatesTable.propTypes = {
  machineStates: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    [constants.STATE_ZERO]: PropTypes.shape({
      write: PropTypes.number.isRequired,
      moveTo: PropTypes.string.isRequired,
      switchTo: PropTypes.string.isRequired,
    }),
    [constants.STATE_ONE]: PropTypes.shape({
      write: PropTypes.number.isRequired,
      moveTo: PropTypes.string.isRequired,
      switchTo: PropTypes.string.isRequired,
    }),
  })),
  currentMachineStateName: PropTypes.string.isRequired,
  currentMachineStateType: PropTypes.oneOf([
    constants.STATE_ONE, constants.STATE_ZERO
  ]).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onChangeControl: PropTypes.func.isRequired,
};

export default MachineStatesTable;
