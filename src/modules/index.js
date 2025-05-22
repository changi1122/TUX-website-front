import { combineReducers } from 'redux';
import userReducer from './UserModule';
import communityReducer from './CommunityModule';
import referenceRoomReducer from './ReferenceRoomModule';
import galleryReducer from './GalleryModule';

const rootReducer = combineReducers({
	userReducer,
	communityReducer,
	referenceRoomReducer,
	galleryReducer
});

export default rootReducer;
