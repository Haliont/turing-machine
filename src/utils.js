import * as constants from './constants'


export const getNewCurrentCellId = ({ moveTo, currentCellId, firstCellId, lastCellId }) => {
  const offset = moveTo === constants.MOVE_LEFT ? -1 : 1;

  const newCurrentCellId = currentCellId + offset;

  if (newCurrentCellId > lastCellId) return firstCellId;
  if (newCurrentCellId < firstCellId) return lastCellId;

  return newCurrentCellId;
}

export const updateCellById = (cells, id, updateCellFields = ((values) => ({ ...values }))) => {
  const foundIndex = cells.findIndex(cell => cell.id === id);

  if (foundIndex === -1) {
    return [...cells];
  };

  const foundCell = cells[foundIndex];
  return [
    ...cells.slice(0, foundIndex),
    { ...foundCell, ...updateCellFields(foundCell) },
    ...cells.slice(foundIndex + 1)
  ];
}

export const updateMachineStatesByName = (
  machineStates,
  name,
  updateFields = ((values) => ({ ...values })),
) => {
  // I'm sorry for copy paste
  const foundIndex = machineStates.findIndex(machineState => machineState.name === name);

  if (foundIndex === -1) {
    return [...machineStates];
  };

  const foundCell = machineStates[foundIndex];
  return [
    ...machineStates.slice(0, foundIndex),
    { ...foundCell, ...updateFields(foundCell) },
    ...machineStates.slice(foundIndex + 1)
  ];
}
