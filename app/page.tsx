"use client";

import React, { useState } from "react";
import { User, Phone, Send, IdCard, Bike, CheckCircle2 } from "lucide-react";
import { RIDER_API_URL } from "@/services/apiConfig";

interface FormData {
  feId: string;
  fullName: string;
  phone: string;
}

interface InputFieldProps {
  id: keyof FormData;
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
        className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2"
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
            focused ? "text-orange-500" : "text-zinc-300"
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
          className="flex-1 bg-transparent text-zinc-900 placeholder-zinc-300 text-base font-medium focus:outline-none"
        />
        {value && (
          <CheckCircle2
            size={16}
            className="text-orange-500 ml-2 flex-shrink-0"
          />
        )}
      </div>
    </div>
  );
};

export default function ZomatoRiderForm() {
  const [formData, setFormData] = useState<FormData>({
    feId: "",
    fullName: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 🔥 Auto generate token
      const token = Math.random().toString(36).substring(2, 10);

      const res = await fetch(RIDER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feId: formData.feId,
          fullName: formData.fullName,
          phone: formData.phone,
          token, // hidden field
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ feId: "", fullName: "", phone: "" });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CheckCircle2 size={40} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold">Application Submitted</h2>
          <button onClick={handleReset} className="mt-4 text-orange-500">
            Submit Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white border border-2 border-zinc-200 rounded-2xl overflow-hidden">
          {/* Header panel */}
          <div className="px-8 pt-10 pb-8 border-b border-zinc-100">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                <Bike size={22} className="text-orange-500" />
              </div>
              <div>
                <h1 className="font-semibold uppercase tracking-widest text-orange-500 mb-1">
                  Delivery Partner Program
                </h1>
                <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                  Complete the form below to begin your journey.
                </p>
              </div>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-8">
            <InputField
              id="feId"
              label="FE ID"
              type="text"
              placeholder="e.g. FE12345678"
              icon={<IdCard size={18} />}
              value={formData.feId}
              onChange={handleChange}
            />

            <InputField
              id="fullName"
              label="Full Name"
              type="text"
              placeholder="e.g. Arjun Sharma"
              icon={<User size={18} />}
              value={formData.fullName}
              onChange={handleChange}
            />

            <InputField
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="+91 98765 43210"
              icon={<Phone size={18} />}
              value={formData.phone}
              onChange={handleChange}
            />

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-orange-500 cursor-pointer text-white font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-colors duration-200 hover:bg-orange-600 active:bg-orange-700 text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit"}
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
