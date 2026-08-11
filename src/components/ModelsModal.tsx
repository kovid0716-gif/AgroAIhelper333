import React from 'react';
import { Cpu, Check, X } from 'lucide-react';
import { INITIAL_MODELS } from '../data/initialData';
import { AIModel } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface ModelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentModel: AIModel;
  onSelectModel: (model: AIModel) => void;
  language?: Language;
}

export const ModelsModal: React.FC<ModelsModalProps> = ({
  isOpen,
  onClose,
  currentModel,
  onSelectModel,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#151B17] border border-[#28352A] rounded-xl p-6 space-y-5 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#28352A] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#2E7D32]/20 border border-[#2E7D32] text-[#38A169]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#F2F5F3] text-base">{t.modelsTitle}</h3>
              <p className="text-xs text-[#8C9A8E] mt-0.5">{t.modelsSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1D2620] text-[#8C9A8E] hover:text-[#F2F5F3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Model Cards */}
        <div className="space-y-2.5">
          {INITIAL_MODELS.map((model) => {
            const isSelected = currentModel.id === model.id;
            return (
              <div
                key={model.id}
                onClick={() => {
                  onSelectModel(model);
                  onClose();
                }}
                className={`p-4 rounded-lg border transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                  isSelected
                    ? 'bg-[#1D2620] border-[#38A169]'
                    : 'bg-[#111612] border-[#28352A] hover:bg-[#1D2620]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#F2F5F3]">{model.name}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#2E7D32]/20 text-[#38A169] border border-[#2E7D32]">
                      {model.badge}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#38A169]">{model.tagline}</p>
                  <p className="text-xs text-[#9EAC9F] leading-relaxed pt-0.5">{model.description}</p>

                  <div className="flex items-center gap-4 pt-1 text-[11px] text-[#8C9A8E] font-mono">
                    <span>Точность: <strong className="text-[#F2F5F3]">{model.accuracy}</strong></span>
                    <span>Скорость: <strong className="text-[#F2F5F3]">{model.speed}</strong></span>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                  isSelected
                    ? 'bg-[#38A169] border-[#38A169] text-white'
                    : 'border-[#2B3A2E] bg-[#0F1411]'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
