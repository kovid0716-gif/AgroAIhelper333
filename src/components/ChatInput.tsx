import React, { useRef, useState, useEffect } from 'react';
import { 
  Upload, 
  Mic, 
  Send, 
  X, 
  Camera, 
  Sparkles, 
  Eye,
  FileImage
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface ChatInputProps {
  inputPrompt: string;
  setInputPrompt: (val: string) => void;
  selectedImage: string | null;
  setSelectedImage: (img: string | null) => void;
  onSend: () => void;
  isLoading: boolean;
  onOpenCamera: () => void;
  onOpenVoice: () => void;
  language: Language;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputPrompt,
  setInputPrompt,
  selectedImage,
  setSelectedImage,
  onSend,
  isLoading,
  onOpenCamera,
  onOpenVoice,
  language,
}) => {
  const [isWindowDragging, setIsWindowDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [previewZoom, setPreviewZoom] = useState(false);
  const dragCounter = useRef(0);
  const t = TRANSLATIONS[language];

  // Window-wide drag and drop events
  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current += 1;
      if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
        setIsWindowDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current -= 1;
      if (dragCounter.current === 0) {
        setIsWindowDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsWindowDragging(false);
      dragCounter.current = 0;
      if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
        readImageFile(e.dataTransfer.files[0]);
      }
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [inputPrompt]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readImageFile(file);
    }
  };

  const readImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if ((inputPrompt.trim() || selectedImage) && !isLoading) {
        onSend();
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-1">
      {/* FULL-WINDOW DRAG AND DROP OVERLAY */}
      {isWindowDragging && (
        <div className="fixed inset-0 z-50 bg-[#0F1411]/90 flex items-center justify-center p-8 animate-fade-in">
          <div className="w-full max-w-xl p-10 rounded-2xl bg-[#151B17] border-2 border-dashed border-[#38A169] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-xl bg-[#1F2A21] border border-[#38A169] flex items-center justify-center text-[#38A169]">
              <FileImage className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <p className="text-xl font-bold text-[#F2F5F3]">Перетащите изображение растения</p>
              <p className="text-xs text-[#9EAC9F]">AgroAI проанализирует листья и стебли</p>
            </div>

            <div className="px-3 py-1 rounded bg-[#2E7D32]/20 text-[#38A169] text-xs font-semibold">
              Отпустите для загрузки
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal for Attached Image */}
      {previewZoom && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewZoom(false)}
        >
          <div className="relative max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden border border-[#28352A] bg-[#151B17]">
            <img src={selectedImage} alt="Plant photo preview" className="w-full h-full object-contain" />
            <button
              onClick={() => setPreviewZoom(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-black/70 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Container with Solid Styling */}
      <div className="relative rounded-xl bg-[#151B17] border border-[#28352A] transition-colors focus-within:border-[#38A169]">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Image Preview Card if Attached */}
        {selectedImage && (
          <div className="p-3 border-b border-[#28352A] flex items-center justify-between bg-[#111612] rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="relative group w-12 h-12 rounded-lg overflow-hidden border border-[#38A169] bg-black flex-shrink-0">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setPreviewZoom(true)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
                  title="Expand image"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#38A169]" />
                  <p className="text-xs font-bold text-[#F2F5F3]">{t.imageReady}</p>
                </div>
                <p className="text-[11px] text-[#9EAC9F]">
                  {t.visionActive}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedImage(null)}
              className="p-1.5 rounded-lg bg-[#1F2A21] text-[#9EAC9F] hover:text-white hover:bg-red-950/50 hover:text-red-400 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Text Input Area */}
        <div className="p-3 md:p-3.5">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.inputPlaceholder}
            className="w-full bg-transparent text-[#F2F5F3] placeholder-[#9EAC9F]/60 text-sm focus:outline-none resize-none leading-relaxed custom-scrollbar max-h-40"
          />

          {/* Action Bar / Controls */}
          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#232D25]">
            {/* Left Button Group */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D2620] hover:bg-[#253227] border border-[#2B3A2E] text-xs font-medium text-[#F2F5F3] transition-colors"
                title={t.uploadImage}
              >
                <Upload className="w-4 h-4 text-[#38A169]" />
                <span className="hidden sm:inline">{t.uploadImage}</span>
              </button>

              <button
                type="button"
                onClick={onOpenCamera}
                className="p-1.5 rounded-lg bg-[#1D2620] hover:bg-[#253227] border border-[#2B3A2E] text-[#9EAC9F] hover:text-[#F2F5F3] transition-colors"
                title={t.liveCamera}
              >
                <Camera className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                type="button"
                onClick={onOpenVoice}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D2620] hover:bg-[#253227] border border-[#2B3A2E] text-xs font-medium text-[#9EAC9F] hover:text-[#F2F5F3] transition-colors"
                title={t.voiceInput}
              >
                <Mic className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">{t.voiceInput}</span>
              </button>
            </div>

            {/* Right: Solid Send Button */}
            <button
              type="button"
              disabled={isLoading || (!inputPrompt.trim() && !selectedImage)}
              onClick={onSend}
              className={`flex items-center gap-2 px-5 py-1.5 rounded-lg font-semibold text-xs transition-colors ${
                isLoading || (!inputPrompt.trim() && !selectedImage)
                  ? 'bg-[#1D2620] text-[#9EAC9F]/40 cursor-not-allowed border border-[#253227]'
                  : 'field-button-primary'
              }`}
            >
              <span>{isLoading ? t.analyzing : t.send}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Helper Footer Hint */}
      <div className="mt-2 text-center flex items-center justify-center gap-1.5 text-[11px] text-[#8C9A8E]">
        <span>{t.dragHint}</span>
      </div>
    </div>
  );
};

