interface InputProps {
  label?: string;
  placeholder: string;
  error?: string;
}
export default function Input({ label, placeholder, error }: InputProps) {
  return (
    <div className="w-full pt-2 pb-1">
      {label && <label className="block pb-2 pt-1 font-medium text-gray-700 capitalize">{label}</label>}
      <input
        type="text"
        className={`outline-1 outline-gray-300  px-4 py-3 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
        }`}
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
