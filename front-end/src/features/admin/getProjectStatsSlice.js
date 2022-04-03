import { createSlice } from '@reduxjs/toolkit';

export const getProjectStatsSlice = createSlice({
    name: 'getProjectStats',
    initialState: {
        value: []
    },
    reducers: {
        getProjectStats: (state, action) => {
            state.value = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { getProjectStats } = getProjectStatsSlice.actions;

export default getProjectStatsSlice.reducer;