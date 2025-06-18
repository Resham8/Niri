interface InputProps {
  refrance?:any
  placeholder: string;
  error?: string;
}
export default function Input({  placeholder,refrance, error }: InputProps) {
  return (
    <div className="w-full ">
      
      <input
        type="text"
        className={`outline-1 outline-gray-300  px-4 py-3 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 w-full ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
        }`}
        ref={refrance}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
