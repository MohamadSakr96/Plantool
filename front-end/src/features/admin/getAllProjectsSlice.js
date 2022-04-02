import { createSlice } from '@reduxjs/toolkit';

export const getAllProjectsSlice = createSlice({
    name: 'getAllProjects',
    initialState: {
        value: []
    },
    reducers: {
        getAllProjects: (state, action) => {
            state.value = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { getAllProjects } = getAllProjectsSlice.actions;

export default getAllProjectsSlice.reducer;