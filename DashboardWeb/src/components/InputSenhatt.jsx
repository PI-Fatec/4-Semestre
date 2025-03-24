import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputPassword = ({ 
  placeholder = "Sua senha",
  value,
  onChange,
  className = "",
  required = false,
  showStrength = false,
  iconStart = null 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      {iconStart && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
          {iconStart}
        </span>
      )}

      <input
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 pr-10 ${iconStart ? 'pl-10' : ''} ${className}`}
      />
      
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
      >
        {showPassword ? (
          <FaEyeSlash size={20} className="text-gray-400" />
        ) : (
          <FaEye size={20} className="text-gray-400" />
        )}
      </button>

      {showStrength && value && (
        <div className="mt-2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-1 w-full rounded-sm ${
                value.length > i * 2 ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InputPassword;
