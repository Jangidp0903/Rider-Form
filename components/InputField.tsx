import React, { useState } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  icon,
  value,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="group">
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2"
      >
        {label}
      </label>
      <div
        className={`flex items-center border-b-2 pb-3 transition-colors duration-200 ${
          focused ? "border-orange-500" : "border-zinc-200"
        }`}
      >
        <span
          className={`mr-3 transition-colors duration-200 ${
            focused ? "text-orange-500" : "text-zinc-500"
          }`}
        >
          {icon}
        </span>
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required
          className="flex-1 bg-transparent text-zinc-900 placeholder-zinc-500 text-base font-medium focus:outline-none"
        />
      </div>
    </div>
  );
};

export default InputField;
