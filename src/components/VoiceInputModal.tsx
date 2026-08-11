import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, Check, Volume2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscript: (text: string) => void;
  language?: Language;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onTranscript,
  language = 'en',
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (isOpen) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = language === 'ru' ? 'ru-RU' : language === 'kk' ? 'kk-KZ' : 'en-US';

        recog.onresult = (event: any) => {
          let currentText = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript;
          }
          setTranscript(currentText);
        };

        recog.onerror = (e: any) => {
          console.error('Speech recognition error:', e);
          setIsListening(false);
        };

        recog.onend = () => {
          setIsListening(false);
        };

        setRecognition(recog);
        recog.start();
        setIsListening(true);
      } else {
        setTranscript('Web Speech API is not supported in this browser. Please type your query.');
      }
    } else {
      if (recognition) {
        recognition.stop();
      }
      setIsListening(false);
      setTranscript('');
    }
  }, [isOpen, language]);

  const toggleListen = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleDone = () => {
    if (transcript.trim()) {
      onTranscript(transcript);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-[#151B17] border border-[#28352A] rounded-xl p-6 text-center space-y-5 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#28352A]">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-[#38A169]" />
            <h3 className="font-bold text-[#F2F5F3] text-base">{t.voiceTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1D2620] text-[#8C9A8E] hover:text-[#F2F5F3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mic Indicator */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <button
            onClick={toggleListen}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isListening
                ? 'bg-[#38A169] text-white'
                : 'bg-[#1D2620] text-[#8C9A8E] hover:text-[#F2F5F3] border border-[#2B3A2E]'
            }`}
          >
            {isListening ? <Mic className="w-7 h-7" /> : <MicOff className="w-7 h-7" />}
          </button>
        </div>

        {/* Status text */}
        <p className="text-xs font-semibold text-[#38A169]">
          {isListening ? t.voiceListening : t.voiceIdle}
        </p>

        {/* Transcript Area */}
        <div className="p-3.5 rounded-lg bg-[#0F1411] border border-[#263328] text-left min-h-[90px] max-h-[150px] overflow-y-auto custom-scrollbar">
          <p className="text-xs text-[#F2F5F3] leading-relaxed">
            {transcript || <span className="text-[#8C9A8E]/60 italic">Слова появятся здесь...</span>}
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={handleDone}
          disabled={!transcript.trim()}
          className={`w-full py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors ${
            transcript.trim()
              ? 'field-button-primary cursor-pointer'
              : 'bg-[#1D2620] text-[#8C9A8E] cursor-not-allowed border border-[#263328]'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{t.voiceInsert}</span>
        </button>
      </div>
    </div>
  );
};
