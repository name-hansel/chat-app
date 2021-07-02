import { createContext } from "react";

import { UserState, User } from "../interfaces";

interface Action1 {
  type: "JOIN_ROOM";
  payload: {
    username: string;
    currentRoom: string;
    isConnected: boolean;
  };
}

interface Action2 {
  type: "GET_USERS";
  payload: User[];
}

interface Action3 {
  type: "DISCONNECT";
}

export type UserAction = Action1 | Action2 | Action3;

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "JOIN_ROOM":
      return {
        ...state,
        username: action.payload.username,
        currentRoom: action.payload.currentRoom,
        isConnected: action.payload.isConnected,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "DISCONNECT":
      return {
        ...state,
        currentRoom: "",
        isConnected: false,
        users: [],
      };
  }
};

export const initialState: UserState = {
  username: "",
  isConnected: false,
  users: [],
  currentRoom: "",
};

export interface UserContextProps {
  userState: UserState;
  userDispatch: React.Dispatch<UserAction>;
}

export const UserContext = createContext<UserContextProps>({
  userState: initialState,
  userDispatch: () => {},
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;
export default UserContext;
