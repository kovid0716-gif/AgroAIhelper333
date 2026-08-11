import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#151B17] border border-[#38A169] text-[#F2F5F3] text-xs font-semibold shadow-lg animate-slide-up">
      <CheckCircle2 className="w-4 h-4 text-[#38A169] flex-shrink-0" />
      <span>{message}</span>
      <button onClick={onClose} className="p-1 text-[#8C9A8E] hover:text-[#F2F5F3] transition-colors cursor-pointer rounded hover:bg-[#1D2620] ml-1">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
