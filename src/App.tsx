import React, { useReducer, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./components/Landing";
import Room from "./components/Room";

import { SocketContext, socket } from "./context/socket";
import { UserContextProvider, userReducer, initialState } from "./context/user";

import "./App.scss";
import RoomRoute from "./components/RoomRoute";

const App = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialState);
  const [connection, setConnection] = useState(true);
  const userContextValues = {
    userState,
    userDispatch,
  };

  useEffect(() => {
    socket.on("connect_error", () => {
      setConnection(false);
    });
  }, []);

  return (
    <Router>
      <SocketContext.Provider value={socket}>
        <UserContextProvider value={userContextValues}>
          <Switch>
            <Route exact path="/">
              <Landing connection={connection} />
            </Route>
            <Route path="/room/:roomName">
              <RoomRoute component={Room} />
            </Route>
          </Switch>
        </UserContextProvider>
      </SocketContext.Provider>
    </Router>
  );
};

export default App;
