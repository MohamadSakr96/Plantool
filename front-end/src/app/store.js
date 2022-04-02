import { configureStore } from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from '../features/auth/authSlice';
import notificationReducer from '../features/admin/notificationSlice';
import updateDataReducer from '../features/admin/notificationSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notification: notificationReducer,
        updateData: updateDataReducer,
    },
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);