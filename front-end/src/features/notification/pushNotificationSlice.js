import { createSlice } from '@reduxjs/toolkit';

export const pushNotificationSlice = createSlice({
    name: 'pushNotification',
    initialState: {
        value: false
    },
    reducers: {
        open: (state) => {
            state.value = true;
        },
        close: (state) => {
            state.value = false;
        }
    }
})

// Action creators are generated for each case reducer function
export const { open, close } = pushNotificationSlice.actions;

export default pushNotificationSlice.reducer;