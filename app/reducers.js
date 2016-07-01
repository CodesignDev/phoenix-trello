import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as auth } from './redux/auth';
import { reducer as registrations } from './redux/registrations';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  routing,
  auth,
  registrations
});

export default rootReducer;
