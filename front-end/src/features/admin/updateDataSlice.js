import { createSlice } from '@reduxjs/toolkit';

export const updateDataSlice = createSlice({
    name: 'updateData',
    initialState: {
        value: false
    },
    reducers: {
        updateData: (state) => {
            state.value = !state.value;
        }
    }
})

// Action creators are generated for each case reducer function
export const { updateData } = updateDataSlice.actions;

export default updateDataSlice.reducer;