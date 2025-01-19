import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { rootReducer, rootPersistConfig } from '../reducer/rootReducer';
import rootApiMiddleware from '../api/rootAPI';
import { setupListeners } from '@reduxjs/toolkit/query';

let middleware: any = (getDefaultMiddleware: any) =>
  __DEV__
    ? getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      })
        .concat([...rootApiMiddleware])
    : getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }).concat([...rootApiMiddleware]);

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const persistor = persistStore(store);

export default store;
