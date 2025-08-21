import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../Features/Posts/postSlices'

const store = configureStore({reducer:{post:postReducer}});

export default store;