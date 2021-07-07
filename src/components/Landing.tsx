import React, { useState, useContext, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { SocketContext } from "../context/socket";
import UserContext from "../context/user";

import { joinRoom } from "../context/actions/user";

interface Props extends RouteComponentProps {
  connection: boolean;
}

interface Room {
  name: string;
  numberOfUsers: number;
}

const Landing = ({ history, connection }: Props) => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const [existing, setExisting] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  const socket = useContext(SocketContext);
  const { userDispatch } = useContext(UserContext);

  useEffect(() => {
    socket.connect();
    socket.emit("current-rooms", (response: { rooms: Room[] }) => {
      setRooms(response.rooms);
    });
  }, [socket]);

  const sendToRoom = () => {
    if (roomName === "" && existing) {
      setRoomName(rooms[0].name);
    }
    if (username !== "" || roomName !== "") {
      socket.emit(
        "username-join",
        username,
        roomName,
        (response: { status: boolean }) => {
          if (response.status) {
            // Dispatch action 'JOIN_ROOM'
            joinRoom(userDispatch, username, roomName);
            history.push(`/room/${roomName}`);
          } else {
            setError(
              "This username already exists in the room. Please choose another."
            );
          }
        }
      );
    } else {
      setError("Invalid username or room name");
    }
  };

  return (
    <main className="join-container">
      <h1 className="heading">Chat App</h1>
      {connection ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendToRoom();
          }}
        >
          <div className="join-form">
            {!existing ? (
              <>
                <div className="join-form-div">
                  <label htmlFor="username">Enter a username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="join-form-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={(e) => setError("")}
                  />
                  <p style={{ color: "red" }}>{error}</p>
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
              </>
            ) : (
              <div className="join-form-div">
                <label htmlFor="room-name">Existing Rooms</label>
                {rooms.length > 0 ? (
                  <div className="room-div">
                    <div key="heading" className="room-item-heading">
                      <p>Room Name</p>
                      <p>No. of users</p>
                    </div>
                    {rooms.map((r) => (
                      <div key={r.name} className="room-item">
                        <p>{r.name}</p>
                        <p>{r.numberOfUsers}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      margin: "0.5rem",
                    }}
                  >
                    No rooms!
                  </p>
                )}
              </div>
            )}
          </div>
          {!existing ? (
            <button type="submit" className="btn">
              Join
            </button>
          ) : (
            ""
          )}
          <button
            style={{ width: "auto" }}
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              setExisting(!existing);
            }}
          >
            {existing ? "Back" : "See Existing Rooms"}
          </button>
        </form>
      ) : (
        <p style={{ color: "red", textAlign: "center", margin: "1rem" }}>
          Server Error
        </p>
      )}
    </main>
  );
};

export default withRouter(Landing);
