import { combineReducers } from 'redux';
import userReducer from './UserModule';
import communityReducer from './CommunityModule';

const rootReducer = combineReducers({
	userReducer,
	communityReducer
});

export default rootReducer;
