import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "../context/user";

const RoomRoute = ({ ...routeProps }) => {
  const {
    userState: { isConnected },
  } = useContext(UserContext);

  if (isConnected) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};

export default RoomRoute;
