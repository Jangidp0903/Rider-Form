"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  icon: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative">
      {/* Label */}
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
        {label}
      </label>

      {/* 🔵 MOBILE SELECT */}
      <div className="relative flex items-center border-b-2 pb-2 border-zinc-200 focus-within:border-orange-500 transition-colors md:hidden">
        {/* Icon */}
        <span className="mr-3 text-zinc-500">{icon}</span>

        {/* Select */}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 bg-transparent text-base font-medium outline-none appearance-none cursor-pointer ${
            value ? "text-zinc-900" : "text-zinc-500"
          }`}
        >
          <option value="" disabled className="text-zinc-500">
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option} value={option} className="text-zinc-900">
              {option}
            </option>
          ))}
        </select>

        {/* Arrow */}
        <ChevronDown
          size={18}
          className="absolute right-0 text-zinc-400 pointer-events-none"
        />
      </div>

      {/* 🟢 DESKTOP CUSTOM SELECT */}
      <div className="hidden md:block">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center border-b-2 pb-3 cursor-pointer transition-colors ${
            isOpen ? "border-orange-500" : "border-zinc-200"
          }`}
        >
          {/* Icon */}
          <span
            className={`mr-3 ${
              isOpen || value ? "text-orange-500" : "text-zinc-500"
            }`}
          >
            {icon}
          </span>

          {/* Value */}
          <div className="flex-1 text-base font-medium">
            {value ? (
              <span className="text-zinc-900">{value}</span>
            ) : (
              <span className="text-zinc-500">{placeholder}</span>
            )}
          </div>

          {/* Arrow */}
          <ChevronDown
            size={18}
            className={`transition-transform ${
              isOpen ? "rotate-180 text-orange-500" : "text-zinc-400"
            }`}
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-zinc-100 rounded-xl shadow-md max-h-[150px] overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-5 py-2 text-sm cursor-pointer hover:bg-orange-50 ${
                  value === option
                    ? "bg-orange-50 text-orange-600"
                    : "text-zinc-700"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
