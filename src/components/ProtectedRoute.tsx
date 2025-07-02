import { useContext, type ReactElement } from "react";
import { WebSocketContext } from "../context/wsContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}:{children : ReactElement}){
    const context = useContext(WebSocketContext);
    if(!context) return <Navigate to={"/"} replace/>

    const {roomId, currentUsername} = context;

    if(!roomId || !currentUsername){
        return <Navigate to={"/"} replace/>
    }


    return children;
}