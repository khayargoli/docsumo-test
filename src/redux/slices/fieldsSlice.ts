import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FieldState {
  selectedIds: number[];
  removedIds: number[];
}

const initialState: FieldState = {
  selectedIds: [],
  removedIds: [],
};

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    selectField(state, action: PayloadAction<number>) {
      state.selectedIds.push(action.payload);
    },
    deselectField(state, action: PayloadAction<number>) {
      state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
    },
    removeField(state, action: PayloadAction<number>) {
      state.removedIds.push(action.payload);
    },
    selectAll(state, action: PayloadAction<number[]>) {
      state.selectedIds = action.payload;
    },
    clearSelection(state) {
      state.selectedIds = [];
    },
  },
});

export const { selectField, deselectField, removeField, selectAll, clearSelection } = fieldsSlice.actions;
export default fieldsSlice.reducer;
