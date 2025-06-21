import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  WebSocketContext,
  type ChatMessage,
  type WsContextType,
} from "./wsContext";

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [roomId, setRoomId] = useState("");
  const [onlineCount, setOnlineCount] = useState(1);
  const [currentUsername, setCurrentUsername] = useState("");

  const connect = (roomId: string, username: string) => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId, username },
        })
      );
    };

    setCurrentUsername(username);
    console.log("currentUsername set to:", username);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "roomInfo") {
        setRoomId(data.payload.roomId);
        setOnlineCount(data.payload.onlineCount);
      }

      if (data.type === "chat") {
        const newMessage = {
          text: data.payload.message,
          username: data.payload.username,
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    wsRef.current = ws;
  };

  const sendMessages = (msg: string) => {
    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: { message: msg, username: currentUsername },
      })
    );
  };

  const leaveRoom = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setMessages([]);
    setRoomId("");
    setOnlineCount(1);
    setCurrentUsername("");
  };

  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  const value: WsContextType = {
    connect,
    sendMessages,
    messages,
    roomId,
    onlineCount,
    currentUsername,
    leaveRoom
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}
