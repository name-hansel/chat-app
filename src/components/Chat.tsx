import React, { useState, useEffect, useContext, useRef } from "react";

import { Messages, RoomMessage, ChatMessage } from "../interfaces";
import { SocketContext } from "../context/socket";
import UserContext from "../context/user";

const Chat = () => {
  const scrollerDiv = useRef<HTMLElement>(null);
  const input = useRef<HTMLInputElement>(null);

  if (input.current) input.current.focus();

  const socket = useContext(SocketContext);

  const {
    userState: { username },
  } = useContext(UserContext);
  // Received
  const [messages, updateMessages] = useState<Messages[]>([
    {
      type: "RoomMessage",
      roomMessage: `Welcome, ${username}!`,
    },
  ]);
  // Msg to be sent
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    socket.on("room-message", ({ type, roomMessage }: RoomMessage) => {
      updateMessages([
        ...messages,
        {
          type,
          roomMessage,
        },
      ]);
    });

    socket.on("message", ({ type, username, message, time }: ChatMessage) => {
      updateMessages([
        ...messages,
        {
          type,
          username,
          message,
          time,
        },
      ]);
    });

    // Scroll to bottom
    if (scrollerDiv.current !== null) scrollerDiv.current.scrollIntoView();
  }, [messages, socket]);

  return (
    <main className="chat-container">
      <section className="message-container">
        {messages.length > 0 &&
          messages.map((message) =>
            message.type === "RoomMessage" ? (
              <div className="room-message-div">{message.roomMessage}</div>
            ) : username === message.username ? (
              <div className="message-div user-sent">
                <div className="message-info user-sent message-info-user-sent">
                  You ({username})
                  <span className="message-time"> {message.time}</span>
                </div>
                <div className="message user-sent message-user-sent">
                  {message.message}
                </div>
              </div>
            ) : (
              <div className="message-div">
                <div className="message-info">
                  {message.username}
                  <span className="message-time"> {message.time}</span>
                </div>
                <div className="message">{message.message}</div>
              </div>
            )
          )}
        <span ref={scrollerDiv}></span>
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMsg(msg.trim());
          if (msg === "" || msg === " ") return false;
          socket.emit("message", msg);
          setMsg("");
        }}
      >
        <div className="message-form">
          <input
            type="text"
            className="message-input"
            placeholder="Enter a message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            ref={input}
          />
          <button className="message-btn" type="submit">
            Send
          </button>
        </div>
      </form>
    </main>
  );
};

export default Chat;
