import React, { useState, useContext, useEffect, useRef } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { SocketContext } from "../context/socket";
import UserContext from "../context/user";

import { joinRoom } from "../context/actions/user";

const Landing = ({ history }: RouteComponentProps) => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const usernameInput = useRef<HTMLInputElement>(null);

  const socket = useContext(SocketContext);
  const { userDispatch } = useContext(UserContext);

  useEffect(() => {
    if (usernameInput.current) usernameInput.current.focus();
  }, []);

  useEffect(() => {
    socket.connect();
  }, [socket]);

  const sendToRoom = () => {
    if (
      username !== "" &&
      username !== " " &&
      roomName !== "" &&
      roomName !== " "
    ) {
      // Dispatch action 'JOIN_ROOM'
      joinRoom(userDispatch, username, roomName);
      history.push(`/room/${roomName}`);
    }
  };

  return (
    <main className="join-container">
      <h1 className="heading">Chat App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendToRoom();
        }}
      >
        <div className="join-form">
          <div className="join-form-div">
            <label htmlFor="username">Enter a username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="join-form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={usernameInput}
            />
          </div>
          <div className="join-form-div">
            <label htmlFor="room-name">Enter name of the room</label>
            <input
              type="text"
              name="room-name"
              id="room-name"
              className="join-form-input"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn">
          Join
        </button>
      </form>
    </main>
  );
};

export default withRouter(Landing);
