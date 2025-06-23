import { LogOut, Send, Sofa } from "lucide-react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import IconButton from "../components/UI/IconButton";
import { useContext, useRef } from "react";

import MessageBubble from "../components/UI/MessageBubble";
import { WebSocketContext } from "../context/wsContext";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const context = useContext(WebSocketContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    messages,
    sendMessages,
    onlineCount,
    roomId,
    currentUsername,
    leaveRoom,
  } = context;

  function handleSend() {
    const message = inputRef.current?.value.trim();
    if (!message) return;

    sendMessages(message);
    inputRef.current.value = "";
  }

  function handleKeyPress(event){
    if(event.key === 'Enter'){
      handleSend();
    }
  }

  const navigate = useNavigate();

  function handleLeave() {
    leaveRoom();
    navigate("/");
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex flex-col">
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 px-6 py-4 shadow-sm flex justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
            <Sofa className="text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-gray-900">{roomId}</h1>
            <p className="text-sm text-gray-500">{onlineCount} online</p>
          </div>
        </div>
        <div>
          <Button
            text="Leave"
            variant="secondary"
            startIcon={<LogOut />}
            onClick={handleLeave}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            message={m.text}
            username={m.username}
            isOwn={m.username === currentUsername}
          />
        ))}
      </div>

      <div className="bg-white/80 border-t bordeer-purple-100 px-6 py-4 flex gap-5">
        <Input placeholder="Type a message......." refrance={inputRef} onKeyDownfn={handleKeyPress}/>
        <IconButton icon={<Send />} onClick={handleSend} />
      </div>
    </div>
  );
}
