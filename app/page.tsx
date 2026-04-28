"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Phone,
  Send,
  IdCard,
  Bike,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
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
  const [token, setToken] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState<string | null>(null);

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

      const res = await axios.post(RIDER_API_URL, {
        feId: formData.feId,
        fullName: formData.fullName,
        phone: formData.phone,
      });

      setToken(res.data.data.token);
      setSubmitted(true);
    } catch (error: any) {
      setErrorModal(error.response?.data?.error || error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ feId: "", fullName: "", phone: "" });
    setSubmitted(false);
    setToken(null);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
        <div className="bg-white border border-zinc-200 rounded-3xl p-10 sm:p-12 text-center max-w-md w-full shadow-sm">
          <CheckCircle2 size={48} className="text-green-500 mx-auto mb-5" />

          <h2 className="text-2xl font-bold mb-2">Form Submitted</h2>

          <p className="text-zinc-500 text-sm mb-8">
            Your request has been received successfully.
          </p>

          {/* 🔥 TOKEN DISPLAY */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl py-6 mb-8">
            <p className="text-xs text-zinc-500 mb-2 tracking-wide">
              Your Token Number
            </p>
            <p className="text-5xl font-extrabold text-orange-500 tracking-tight">
              #{token}
            </p>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed">
            Please wait for your turn. Our team will contact you shortly.
          </p>
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
                  Bike Rentals by Zomato
                </h1>
                <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                  Rent your bike, start earning, and move faster every day.
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

      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative transform transition-all">
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                Submission Failed
              </h3>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                {errorModal}
              </p>
              <button
                onClick={() => setErrorModal(null)}
                className="w-full py-3 bg-zinc-100 bg-zinc-200 hover:bg-zinc-300 text-zinc-900 font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
