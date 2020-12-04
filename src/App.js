import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Log from './pages/Log';
import AddLog from './pages/AddLog';
import SubLog from './pages/SubLog';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <>
          <Switch>
            <Route path="/subLog" component={SubLog}/>
            <Route path="/addLog" component={AddLog}/>
            <Route path="/log" component={Log}/>
            <Route path="/register" component={SignUp}/>
            <Route path="/" component={SignIn} />
          </Switch>
        </>
      </Router>
    </UserProvider>
  );
}
