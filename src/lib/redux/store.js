import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
//1
const CombinedReducers = combineReducers(
    {
        user: userReducer
    }
)
//2
const persistConfig = {
    key: "root",
    storage,
    version: '1'
}
//3
const PersistedReducer = persistReducer(persistConfig, CombinedReducers)
//4
export const ConfiguredStore = configureStore(
    {
        reducer: PersistedReducer,
        middleware: (getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck: false})
    }
)
//5
export const PersistedStore = persistStore(ConfiguredStore)