interface bubbleProps {
  message: string;
  isOwn: boolean;
  username: string;
}
export default function MessageBubble({
  message,
  isOwn,
  username,
}: bubbleProps) {
  return (
    <div
      className={`flex items-end space-x-2 ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`max-w-xs lg:max-w-md ${isOwn ? "order-first" : ""}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isOwn
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md"
              : "bg-purple-100 text-gray-800 rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed break-words">{message}</p>
        </div>
        <div
          className={`flex items-center mt-1 space-x-2 ${
            isOwn ? "justify-end" : "justify-start"
          }`}
        >
          {!isOwn && (
            <span className="text-xs text-gray-500 font-medium">
              {username}
            </span>
          )}
          {/* <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span> */}
        </div>
      </div>
    </div>
  );
}
