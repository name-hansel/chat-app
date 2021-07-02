import { UserAction } from "../user";
import { User } from "../../interfaces";

export const joinRoom = (
  dispatch: React.Dispatch<UserAction>,
  username: string,
  currentRoom: string
) => {
  dispatch({
    type: "JOIN_ROOM",
    payload: {
      username,
      currentRoom,
      isConnected: true,
    },
  });
};

export const getUsers = (
  dispatch: React.Dispatch<UserAction>,
  users: User[]
) => {
  dispatch({
    type: "GET_USERS",
    payload: users,
  });
};

export const disconnectUser = (dispatch: React.Dispatch<UserAction>) => {
  dispatch({
    type: "DISCONNECT",
  });
};
