import cells from './cells';
import machineStates from './machineStates';

export default () => ({
  cells,
  machineStates,
  isRunning: false,
  currentCellId: 0,
  currentMachineStateName: 'A',
});
