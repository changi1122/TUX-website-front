import { combineReducers } from 'redux';
import counterReducer from './CounterModule';
import userReducer from './UserModule';

const rootReducer = combineReducers({
	counterReducer,
	userReducer
});

export default rootReducer;
