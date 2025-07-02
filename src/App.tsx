import "./App.css";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateChatRoom from "./pages/CreateChatRoom";
import { WebSocketProvider } from "./context/WsContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <WebSocketProvider>
        <Routes>
          <Route path="/" element={<CreateChatRoom />}></Route>
          <Route path="/chat" element={
            <ProtectedRoute><ChatPage /></ProtectedRoute>}></Route>
        </Routes>
      </WebSocketProvider>
    </BrowserRouter>
  );
}

export default App;
