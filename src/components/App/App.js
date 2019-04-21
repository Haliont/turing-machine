import React from 'react';
import cn from 'classnames';
import createState from '../../state'
import Tape from '../Tape';
import styles from './App.module.scss'
import { getNewCurrentCellId, updateCellById, updateMachineStatesByName } from '../../utils'
import MachineStatesTable from '../MachineStatesTable';

class App extends React.Component {
  state = createState();

  handleStart = () => this.setState({ isRunning: true });

  handleStop = () => this.setState({ isRunning: false });

  handleStep = () => this.setState(({ machineStates, currentMachineStateName, cells, currentCellId }) => {
    const lastCellId = cells[cells.length - 1].id;
    const firstCellId = cells[0].id;

    const currentCell = cells.find(c => c.id === currentCellId);
    const currentMachineState = machineStates.find(ms => ms.name === currentMachineStateName);

    const {
      moveTo,
      switchTo,
      write: newDigit,
    } = currentMachineState[currentCell.digit];

    const updatedCells = updateCellById(cells, currentCellId, () => ({ digit: newDigit }));

    const newMachineStateName = switchTo || machineStates[0].name;
    const extraFields = switchTo ? {} : { isRunning: false };

    return {
      cells: updatedCells,
      currentMachineStateName: newMachineStateName,
      currentCellId: getNewCurrentCellId({ moveTo, lastCellId, firstCellId, currentCellId }),
      ...extraFields,
    };
  });

  // machineStateType - it is one of constants, constants.STATE_ONE or constants.STATE_ZERO
  handleChangeControl = ({ machineStateName, machineStateType, fieldName, newValue }) =>
    this.setState(({ machineStates }) => ({
      machineStates: updateMachineStatesByName(machineStates, machineStateName,
        ({ [machineStateType]: typeFields }) => ({
          [machineStateType]: { ...typeFields, [fieldName]: newValue },
        }),
      ),
    }));

  renderControls() {
    const { isRunning } = this.state;
    const { handleStart, handleStep, handleStop } = this;
    const { controlsControl, controlsControlStart, controlsControlStep, controlsControlStop, } = styles;

    return (
      <div className={styles.controls}>
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={cn(controlsControl, controlsControlStart)}
        >
          Старт
        </button>
        <button
          onClick={handleStep}
          disabled={!isRunning}
          className={cn(controlsControl, controlsControlStep)}
        >
          Шаг
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className={cn(controlsControl, controlsControlStop)}
        >
          Стоп
        </button>
      </div>
    )
  }

  render() {
    const { cells, machineStates, currentCellId, currentMachineStateName, isRunning } = this.state;
    const { handleChangeControl } = this;

    const { digit: currentMachineStateType } = cells.find(c => c.id === currentCellId);

    return (
      <div className={styles.container}>
        <Tape {...{ cells, currentCellId }} />
        {this.renderControls()}
        <MachineStatesTable
          isDisabled={isRunning}
          machineStates={machineStates}
          currentMachineStateName={currentMachineStateName}
          currentMachineStateType={currentMachineStateType}
          onChangeControl={handleChangeControl}
        />
      </div>
    );
  }
}

export default App;
