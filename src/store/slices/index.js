import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  amountSteps: 10,
  amountCells: 3,
  min: 3,
  max: 8,
  isLoading: false,
};

export const counterSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setAmountCells: (state, action) => {
      state.amountCells = action.payload;
    },
    setAmountCellsStart: (state) => {
      state.amountCells = state.min;
    }
  },
});

export const { setAmountCells, setAmountCellsStart } = counterSlice.actions;

export const selectHeaderStartText = ({ main }) => [
    'Добро пожаловать в игру "Лабиринт"', 
    `Пожалуйста, введите количество клеток от ${ main.min } до ${ main.max }`,
];
export const selectAmountSteps = ({ main }) => main.amountSteps;
export const selectAmountCells = ({ main }) => main.amountCells;
export const selectMinMax      = ({ main }) => ({ min: main.min, max: main.max });

export default counterSlice.reducer;
