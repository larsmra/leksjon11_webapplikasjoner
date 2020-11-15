import React, { useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useAuthContext } from '../context/AuthProvider';

import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import CreatePoll from '../pages/CreatePoll';
import NoMatch from '../pages/NoMatch';
import TakePoll from '../pages/TakePoll';

const AuthenticatedRoute = ({ children, ...params }) => {
  const { isLoggedIn, isLoading } = useAuthContext();

  return (
    <Route
      {...params}
      render={({ location }) =>
        isLoggedIn && !isLoading ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => (
  <Router>
    <MainLayout>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <AuthenticatedRoute exact path="/">
            <Home />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/polls/create">
            <CreatePoll />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/polls/:id">
            <TakePoll />
          </AuthenticatedRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Suspense>
    </MainLayout>
  </Router>
);

export default Routes;
