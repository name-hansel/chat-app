import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router-dom";

import UserContext from "../context/user";
import { SocketContext } from "../context/socket";
import { disconnectUser } from "../context/actions/user";
import { User } from "../interfaces";

interface Props extends RouteComponentProps {
  room: string;
  users: User[];
}

const Sidebar: React.FC<Props> = ({ room, users, history }) => {
  const { userDispatch } = useContext(UserContext);
  const socket = useContext(SocketContext);

  return (
    <section className="sidebar">
      <h1 className="heading sidebar-heading">{room}</h1>
      <button
        className="leave-room"
        onClick={(e) => {
          disconnectUser(userDispatch);
          socket.disconnect();
          history.push(`/`);
        }}
      >
        <Link to="/">Leave</Link>
      </button>
      <div className="sidebar-users">
        <h2 className="users-heading">Users in this Room</h2>
        <div className="users">
          <ul className="users-list">
            {users.map((user) => (
              <li className="user" key={user.id}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Sidebar);
