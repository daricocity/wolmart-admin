import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';

// Combined Reducer
const reducer = combineReducers({
    customization: customizationReducer
});

export default reducer;
