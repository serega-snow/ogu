import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './slices/mainSlice';

export default configureStore({
  reducer: { mainSlice },
});
