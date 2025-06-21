import { createContext } from "react";

export interface ChatMessage {
  text: string;
  username: string;
}


export interface WsContextType {
  connect: (roomId: string, username: string) => void;
  sendMessages: (msg: string) => void;
  messages: ChatMessage[];
  roomId: string;
  onlineCount: number;
  currentUsername: string;
  leaveRoom: () => void;
}

export const WebSocketContext = createContext<WsContextType | undefined>(undefined);
