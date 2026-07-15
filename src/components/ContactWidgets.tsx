import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle } from 'lucide-react';

export const ContactWidgets = () => {
  const phoneNumber = '0907828939';
  const zaloUrl = `https://zalo.me/${phoneNumber}`;

  return (
    <>
      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] flex md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <a
          href={zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-500 py-3.5 flex justify-center items-center gap-2 text-white font-semibold text-base active:bg-blue-600 transition-colors"
        >
          <span>Chat Zalo</span>
        </a>
        <a
          href={`tel:${phoneNumber}`}
          className="flex-1 bg-brand-green py-3.5 flex justify-center items-center gap-2 text-white font-semibold text-base active:bg-green-700 transition-colors"
        >
          <PhoneCall size={20} />
          <span>Gọi ngay</span>
        </a>
      </div>

      {/* Desktop Floating Widgets */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-[100] flex-col gap-4">
        {/* Zalo Widget */}
        <motion.a
          href={zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 cursor-pointer"
        >
          <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
          <span className="font-bold text-white text-sm relative z-10">Zalo</span>
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat Zalo
          </div>
        </motion.a>

        {/* Phone Widget */}
        <motion.a
          href={`tel:${phoneNumber}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group w-14 h-14 bg-brand-green rounded-full flex items-center justify-center shadow-lg shadow-brand-green/30 cursor-pointer"
        >
          <div className="absolute inset-0 bg-brand-green rounded-full animate-ping opacity-40" style={{ animationDuration: '2s' }}></div>
          <PhoneCall className="text-white relative z-10" size={24} />
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {phoneNumber}
          </div>
        </motion.a>
      </div>
    </>
  );
};
