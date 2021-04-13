import { combineReducers } from 'redux'
import authenticationReducer from './authentication/reducer'

const reducers = combineReducers({
    authenticationReducer
});

export default reducers;