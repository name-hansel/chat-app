import React from "react";
import { io } from "socket.io-client";

export const socket = io("https://hansel-chat-app-server.herokuapp.com/");
export const SocketContext = React.createContext(socket);
