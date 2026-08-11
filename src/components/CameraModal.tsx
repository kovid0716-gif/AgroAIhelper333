import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
  language?: Language;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  language = 'en',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    setError(null);
    setCapturedUrl(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setError('Could not access camera. Please allow camera permissions in your browser.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedUrl(dataUrl);
    }
  };

  const confirmPhoto = () => {
    if (capturedUrl) {
      onCapture(capturedUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#151B17] border border-[#28352A] rounded-xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="p-4 border-b border-[#28352A] flex items-center justify-between bg-[#111612]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#2E7D32]/20 border border-[#2E7D32] text-[#38A169]">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#F2F5F3] text-base">{t.cameraTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1D2620] text-[#8C9A8E] hover:text-[#F2F5F3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Viewport */}
        <div className="relative aspect-video bg-[#000000] flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-red-400 space-y-2">
              <AlertCircle className="w-10 h-10 mx-auto opacity-80" />
              <p className="text-sm font-semibold">{error}</p>
            </div>
          ) : capturedUrl ? (
            <img src={capturedUrl} alt="Captured plant" className="w-full h-full object-cover" />
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Target Focus Overlay */}
              <div className="absolute inset-8 border-2 border-dashed border-[#38A169] rounded-lg pointer-events-none flex items-center justify-center">
                <span className="text-[10px] uppercase font-bold text-[#F2F5F3] bg-black/70 px-2 py-0.5 rounded">
                  {t.cameraFocus}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 border-t border-[#28352A] flex items-center justify-center gap-4 bg-[#111612]">
          {capturedUrl ? (
            <>
              <button
                onClick={() => setCapturedUrl(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1D2620] hover:bg-[#253227] border border-[#2B3A2E] text-[#F2F5F3] font-semibold text-xs transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t.retake}</span>
              </button>

              <button
                onClick={confirmPhoto}
                className="flex items-center gap-2 px-6 py-2 rounded-lg field-button-primary font-bold text-xs transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>{t.usePhoto}</span>
              </button>
            </>
          ) : (
            <button
              onClick={takePhoto}
              disabled={!!error}
              className="w-12 h-12 rounded-full bg-[#38A169] hover:bg-[#2E7D32] text-white flex items-center justify-center border-2 border-white/20 transition-transform active:scale-95 cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
