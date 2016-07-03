import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Shell from './layout/Shell';
import Index from './containers/Index/Index';
import AuthenticatedShell from './containers/AuthenticatedShell/AuthenticatedShell';
import UserLogin from './components/UserLogin/UserLogin';
import UserRegister from './components/UserRegister/UserRegister';
import BoardView from './containers/BoardView/BoardView';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  return (
    <Route component={Shell}>
      <Route path="/login" component={UserLogin} />
      <Route path="/register" component={UserRegister} />

      <Route path="/" component={AuthenticatedShell}>
        <IndexRoute component={Index} />
        <Route path="/boards/:id" component={BoardView} />
      </Route>
    </Route>
  );
};
