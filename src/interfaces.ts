export interface ChatMessage {
  type: "ChatMessage";
  username: string;
  message: string;
  time: Date;
}

export interface RoomMessage {
  type: "RoomMessage";
  roomMessage: string;
}

export type Messages = ChatMessage | RoomMessage;

export interface User {
  id: string;
  username: string;
  room: string;
}

export interface UserState {
  username: string;
  currentRoom: string;
  isConnected: boolean;
  users: User[];
}

export interface MessagesState {
  messages: Messages[];
}
