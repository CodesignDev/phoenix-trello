import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as auth } from './redux/auth';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  routing,
  auth
});

export default rootReducer;
