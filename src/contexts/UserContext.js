import React, { createContext, useState } from 'react';


const UserContext = createContext();

export default UserContext;

export function UserProvider(props) {
  const [user, setUser] = useState([]);
  const [logAdd, setLogAdd] = useState(false);
  const [logSub, setLogSub] = useState(false);

  return (
    <UserContext.Provider value={{user, setUser,logAdd, setLogAdd,logSub, setLogSub}}>
      {props.children}
    </UserContext.Provider>
  );
}