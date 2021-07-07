import React from "react";
import { io } from "socket.io-client";
// https://hansel-chat-app-server.herokuapp.com/
export const socket = io("http://localhost:5000");
export const SocketContext = React.createContext(socket);
