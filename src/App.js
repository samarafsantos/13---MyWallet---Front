import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Log from './pages/Log';

// import { UserProvider } from './contexts/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <>
          <Switch>
            <Route path="/log" component={Log}/>
            <Route path="/register" component={SignUp}/>
            <Route path="/" component={SignIn} />
          </Switch>
        </>
      </Router>
    </UserProvider>
  );
}
