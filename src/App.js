import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

// import { UserProvider } from './contexts/UserContext';

export default function App() {
  return (
    // <UserProvider>
      <Router>
        <>
          <Switch>
            <Route path="/register" component={SignUp}/>
            <Route path="/" component={SignIn} />
          </Switch>
        </>
      </Router>
    // </UserProvider>
  );
}
