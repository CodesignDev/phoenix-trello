import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as auth } from './redux/auth';
import { reducer as registrations } from './redux/registrations';
import { reducer as boards } from './redux/boards';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  routing,
  auth,
  registrations,
  boards
});

export default rootReducer;
