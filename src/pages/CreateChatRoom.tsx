import { useContext, useRef, useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { WebSocketContext } from "../context/wsContext";
import { useNavigate } from "react-router-dom";
import { generateRoomId } from "../utils/roomUtils";


export default function CreateChatRoom() {
  const [newCode, setNewCode] = useState();
  const roomInputId = useRef();
  const usernameRef = useRef();
const navigate = useNavigate();
  const context = useContext(WebSocketContext)

  if(!context){
    console.log("no access to context")
  }

  const { connect } = context;

  function handleJoin() {
    const roomId = roomInputId.current?.value;
    const username = usernameRef.current?.value;
    if (roomId) {
      connect(roomId,username);
      navigate("/chat")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="rounded-2xl shadow-xl border bg-white/70 border-purple-100 p-8 w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Get Started</h1>
          <p className="text-gray-600 text-sm">Connect instantly with friends and family</p>
        </div>
        
        <Input placeholder="Enter Name" refrance={usernameRef}  />

        <div className="flex items-center justify-center  gap-4">
          <Input placeholder="Room code" refrance={roomInputId} />
          <Button text="Join" size="md" onClick={handleJoin}  />
        </div>

        <div className="pt-3 space-y-5">
          <Button
            text="Create a new room"
            fullWidth={true}
            onClick={() => {
              setNewCode( generateRoomId());
            }}
          />
          {newCode && (
            <div className="text-center text-lg text-gray-600 w-full bg-gray-200 px-3 py-6 rounded-xl">
              {newCode}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}