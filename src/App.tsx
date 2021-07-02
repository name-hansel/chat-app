import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./components/Landing";
import Room from "./components/Room";

import { SocketContext, socket } from "./context/socket";
import { UserContextProvider, userReducer, initialState } from "./context/user";

import "./App.scss";
import RoomRoute from "./components/RoomRoute";

const App = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialState);
  const userContextValues = {
    userState,
    userDispatch,
  };

  return (
    <Router>
      <SocketContext.Provider value={socket}>
        <UserContextProvider value={userContextValues}>
          <Switch>
            <Route exact path="/">
              <Landing />
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
