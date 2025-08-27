import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import leadReducer from './redux/leadSlice';
import contactReducer from './redux/contactSlice';
import authReducer from './redux/authSlice';
import countReducer from './redux/countSlice'
import extendReducer from './redux/extendSlice'
import notificationReducer from './redux/notificationSlice'
import serviceReducer from './redux/serviceSlice'
import blogsReducer from "./redux/blogSlice"
import testimonialsReducer from "./redux/testimonialSlice"
import faqReducer from "./redux/faqSlice"
export const store = configureStore({
  reducer: {
    users: userReducer,
    leads: leadReducer,
    contacts: contactReducer,
    auth: authReducer,
    blogs:blogsReducer,
    counts: countReducer,
    extends: extendReducer,
    notifications: notificationReducer,
    services: serviceReducer,
    testimonials: testimonialsReducer,
    faq:faqReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;