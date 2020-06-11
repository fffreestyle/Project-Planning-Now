import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './store/index'

const store = configureStore({
    reducer: rootReducer
})

export default store;


