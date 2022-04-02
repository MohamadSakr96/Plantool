import { createSlice } from '@reduxjs/toolkit';

export const getAllUsersInfoSlice = createSlice({
    name: 'getAllUsersInfo',
    initialState: {
        value: []
    },
    reducers: {
        getUsersInfo: (state, action) => {
            state.value = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { getUsersInfo } = getAllUsersInfoSlice.actions;

export default getAllUsersInfoSlice.reducer;