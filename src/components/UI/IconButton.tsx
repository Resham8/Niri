import type { ReactElement } from "react";

interface IconButtonProps {
    icon:ReactElement;
    onClick?:() => void;
}
export default function IconButton({icon, onClick}:IconButtonProps) {
  return <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-102 w-11 h-11 shrink-0 grow-0 rounded-full p-3 flex items-center justify-center" onClick={onClick}>{icon}</button>;
}
