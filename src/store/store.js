import {compose, createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import { rootReducer } from "./root-redicer";

const middlewares = [logger]

const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, undefined, composedEnhancers)