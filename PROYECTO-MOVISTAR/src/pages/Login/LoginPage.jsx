import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('sms'); // 'sms' | 'whatsapp'

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 md:p-8 font-sans selection:bg-sky-100">
      
      {/* Centered Form Container (Max-width ~480px, white background) */}
      <div className="w-full max-w-[480px] bg-white flex flex-col justify-between min-h-[640px] py-4">
        
        {/* Top Section */}
        <div className="space-y-6">
          
          {/* 1. Back Arrow */}
          <div className="flex items-center justify-start pt-2 pb-2">
            <button
              onClick={() => navigate('/dashboard')}
              type="button"
              className="p-1 -ml-1 text-slate-800 hover:text-sky-600 transition-colors focus:outline-none"
              aria-label="Volver"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#222222" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-8 h-8"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          </div>

          {/* 2. Top Blue Line-Art Illustration */}
          <div className="flex justify-center pt-1 pb-2">
            <svg 
              viewBox="0 0 160 70" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-[150px] h-[65px]"
            >
              {/* Left: Dashed curve */}
              <path 
                d="M15 46 C 25 22, 48 20, 64 32" 
                stroke="#50A7E2" 
                strokeWidth="2" 
                strokeDasharray="3.5 3.5" 
                strokeLinecap="round" 
              />

              {/* Center: Paper airplane figure */}
              <g transform="translate(68, 16) rotate(-8)">
                <path 
                  d="M0 16 L32 0 L18 30 L13 18 Z" 
                  fill="none" 
                  stroke="#50A7E2" 
                  strokeWidth="2" 
                  strokeLinejoin="round" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M13 18 L32 0" 
                  stroke="#50A7E2" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                />
              </g>

              {/* Right: Vertical Cellphone outline */}
              <rect 
                x="115" 
                y="10" 
                width="30" 
                height="50" 
                rx="6" 
                fill="none" 
                stroke="#50A7E2" 
                strokeWidth="2.2" 
              />
              {/* Speaker notch line */}
              <line 
                x1="126" 
                y1="15" 
                x2="134" 
                y2="15" 
                stroke="#50A7E2" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
              />
              {/* Home button dot */}
              <circle cx="130" cy="53" r="1.8" fill="#50A7E2" />
            </svg>
          </div>

          {/* 3. Title & Description */}
          <div className="text-center space-y-3">
            <h1 className="text-[25px] sm:text-[27px] font-semibold text-[#222222] tracking-tight leading-snug">
              Ingresa tu número Movistar
            </h1>
            
            <div className="text-[16px] sm:text-[17px] leading-relaxed text-[#4A4A4A]">
              <p className="font-normal">Te enviaremos un código de seguridad</p>
              <p className="font-semibold text-[#222222]">para verificar tu identidad</p>
            </div>
          </div>

          {/* 4. Number Input Form Field */}
          <form onSubmit={handleSubmit} id="login-form" className="pt-3">
            <div className="relative flex items-center">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Número de celular Movistar"
                className="w-full h-[58px] pl-6 pr-12 rounded-[6px] bg-white border-[1.5px] border-[#767676] text-[#222222] placeholder-[#757575] text-[16px] sm:text-[17px] outline-none transition-colors focus:border-[#50A7E2]"
              />
              {/* Right Phone Outline Icon */}
              <div className="absolute right-5 pointer-events-none text-[#757575]">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-[22px] h-[22px]"
                >
                  <rect x="6" y="2" width="12" height="20" rx="3" />
                  <line x1="10" y1="18" x2="14" y2="18" />
                </svg>
              </div>
            </div>
          </form>

          {/* 5. Delivery Method Options */}
          <div className="pt-4 space-y-3">
            <p className="text-[16px] sm:text-[17px] text-[#2B2B2B] font-normal text-left">
              ¿Cómo prefieres recibir el código?
            </p>

            {/* Options Container Box */}
            <div className="w-full bg-white border-[1.5px] border-[#E0E0E0] rounded-[12px] p-5 space-y-5">
              
              {/* Option 1: Por SMS */}
              <label 
                onClick={() => setDeliveryMethod('sms')}
                className="flex items-center gap-4 cursor-pointer group select-none"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="sms"
                    checked={deliveryMethod === 'sms'}
                    onChange={() => setDeliveryMethod('sms')}
                    className="sr-only"
                  />
                  <div className={`w-[26px] h-[26px] rounded-full border-[2px] transition-colors flex items-center justify-center ${
                    deliveryMethod === 'sms' 
                      ? 'border-[#50A7E2]' 
                      : 'border-[#9CA3AF] group-hover:border-[#6B7280]'
                  }`}>
                    {deliveryMethod === 'sms' && (
                      <div className="w-[12px] h-[12px] rounded-full bg-[#50A7E2]" />
                    )}
                  </div>
                </div>
                <span className="text-[16px] sm:text-[17px] text-[#374151] font-normal">
                  Por SMS
                </span>
              </label>

              {/* Option 2: Por WhatsApp */}
              <label 
                onClick={() => setDeliveryMethod('whatsapp')}
                className="flex items-center gap-4 cursor-pointer group select-none"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="whatsapp"
                    checked={deliveryMethod === 'whatsapp'}
                    onChange={() => setDeliveryMethod('whatsapp')}
                    className="sr-only"
                  />
                  <div className={`w-[26px] h-[26px] rounded-full border-[2px] transition-colors flex items-center justify-center ${
                    deliveryMethod === 'whatsapp' 
                      ? 'border-[#50A7E2]' 
                      : 'border-[#9CA3AF] group-hover:border-[#6B7280]'
                  }`}>
                    {deliveryMethod === 'whatsapp' && (
                      <div className="w-[12px] h-[12px] rounded-full bg-[#50A7E2]" />
                    )}
                  </div>
                </div>
                <span className="text-[16px] sm:text-[17px] text-[#374151] font-normal">
                  Por WhatsApp
                </span>
              </label>

            </div>
          </div>

        </div>

        {/* Bottom Section: Siguiente Button */}
        <div className="pt-8 pb-4">
          <button
            form="login-form"
            type="submit"
            className="w-full h-[56px] rounded-full bg-[#7EC6F1] hover:bg-[#50A7E2] active:bg-[#4196D1] text-white font-semibold text-[17px] sm:text-[18px] transition-colors shadow-none flex items-center justify-center"
          >
            Siguiente
          </button>
        </div>

      </div>
    </div>
  );
}
