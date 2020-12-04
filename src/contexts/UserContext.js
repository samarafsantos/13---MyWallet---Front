import React, { createContext, useState } from 'react';


const UserContext = createContext();

export default UserContext;

export function UserProvider(props) {
  const [user, setUser] = useState([]);
  const [logAdd, setLogAdd] = useState([]);
  const [logSub, setLogSub] = useState([]);

  return (
    <UserContext.Provider value={{user, setUser,logAdd, setLogAdd,logSub, setLogSub}}>
      {props.children}
    </UserContext.Provider>
  );
}