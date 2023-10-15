import { combineReducers, createStore } from "redux";
import { reactFormReducer } from "./reducers/reducer";

const rootReducer = combineReducers({
    reactFormReducer,
})

export const store = createStore(
    rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)