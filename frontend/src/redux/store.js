import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import rootReducer from './modules/'

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
})


const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
    devTools: true
})

export {store};
