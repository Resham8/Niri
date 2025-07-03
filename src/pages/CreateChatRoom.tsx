import { useContext, useRef, useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { WebSocketContext } from "../context/wsContext";
import { useNavigate } from "react-router-dom";
import { generateRoomId } from "../utils/roomUtils";

export default function CreateChatRoom() {
  const [newCode, setNewCode] = useState<string>();
  const [activeTab, setActiveTab] = useState("create");
  const roomInputId = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const context = useContext(WebSocketContext);

  if (!context) {
    console.log("no access to context");
  }

  const { connect } = context;

  function handleJoin() {
    const roomId = roomInputId.current?.value;
    const username = usernameRef.current?.value;
    if (roomId) {
      connect(roomId, username);
      navigate("/chat");
    }
  }

  function handleEnter() {
    const roomId = newCode;
    const username = usernameRef.current?.value;
    if (roomId) {
      connect(roomId, username);
      navigate("/chat");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="rounded-2xl shadow-xl border bg-white/70 border-purple-100 p-8 w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Get Started</h1>
          <p className="text-gray-600 text-sm">
            Connect instantly with friends and family
          </p>
        </div>

        <div className="w-full">
          <div className="flex bg-slate-50 rounded-2xl p-2 border border-slate-200/60">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "create"
                  ? "bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              Create Room
            </button>
            <button
              onClick={() => setActiveTab("join")}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "join"
                  ? "bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              Join Room
            </button>
          </div>
        </div>

        {activeTab === "create" && (
          <div>
            <Input placeholder="Enter Name" refrance={usernameRef} />
            <div className="pt-3 space-y-5">
              {newCode && (
                <div className="text-center text-lg text-gray-600 w-full bg-gray-200 px-3 py-6 rounded-xl">
                  {newCode}
                </div>
              )}
              {!newCode && (<Button
                text="Create a new room"
                fullWidth={true}
                onClick={() => {
                  setNewCode(generateRoomId());
                }}
              />)}
              {newCode && (<Button text="Enter the Room" fullWidth={true} onClick={handleEnter} />)}
            </div>
          </div>
        )}

        {activeTab === "join" && (
          <div className="flex items-center justify-center flex-col gap-4">
            <Input placeholder="Room code" refrance={roomInputId} />
            <Button text="Join" fullWidth={true} onClick={handleJoin} />
          </div>
        )}
      </div>
    </div>
  );
}
