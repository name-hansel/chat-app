import React, { useContext, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { SocketContext } from "../context/socket";

import Sidebar from "./Sidebar";
import Chat from "./Chat";
import UserContext from "../context/user";
import { getUsers } from "../context/actions/user";
interface RouterProps {
  roomName: string;
}

interface Props extends RouteComponentProps<RouterProps> {
  // other props
}

const Room: React.FC<Props> = ({ match }) => {
  const socket = useContext(SocketContext);
  const roomName = match.params.roomName;

  const {
    userState: { username, isConnected, users },
    userDispatch,
  } = useContext(UserContext);

  // Connect to room once Room is rendered
  useEffect(() => {
    socket.emit("room", {
      username,
      room: roomName,
    });
  }, [socket, roomName, username]);

  // Change state based on new users
  useEffect(() => {
    socket.on("current-users", ({ users }) => {
      getUsers(userDispatch, users);
    });
  }, [socket, userDispatch, roomName]);

  if (isConnected)
    return (
      <main className="chat-body">
        <Sidebar room={roomName} users={users} />
        <Chat />
      </main>
    );
  else return <h1>Not connected</h1>;
};

export default withRouter(Room);
