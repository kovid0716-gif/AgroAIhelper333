import React from 'react';
import { Sprout, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Logo } from './Logo';

interface GreetingProps {
  onSelectPreset: (text: string) => void;
  language: Language;
}

export const Greeting: React.FC<GreetingProps> = ({ onSelectPreset, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="w-full max-w-3xl mx-auto text-center pt-8 md:pt-12 pb-6 px-4 space-y-8 animate-fade-in">
      {/* Brand Hero Logo Display */}
      <div className="flex justify-center mb-2">
        <div className="p-4 rounded-2xl bg-[#151B17] border border-[#28352A] shadow-sm flex items-center justify-center">
          <Logo size="xl" variant="full" />
        </div>
      </div>

      {/* Badge Banner */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A221C] border border-[#2D3C30] cursor-default">
        <Sprout className="w-4 h-4 text-[#38A169]" />
        <span className="text-xs font-semibold text-[#E2E8F0] tracking-wide">
          {t.badgeVision}
        </span>
      </div>

      {/* Hero Title & Subtitle */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#F2F5F3] leading-tight">
          {t.greetingTitleStart}{' '}
          <span className="text-[#38A169]">
            {t.greetingTitleHighlight}
          </span>
        </h1>
        <p className="text-sm md:text-base text-[#9EAC9F] max-w-xl mx-auto font-normal leading-relaxed">
          {t.greetingSubtitle}
        </p>
      </div>

      {/* Preset Scenario Cards */}
      <div className="pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#8C9A8E] mb-4">
          {t.quickScenarios}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {t.presets.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelectPreset(item.text)}
              className="group text-left p-4 rounded-xl field-card field-card-interactive flex items-start gap-3.5 cursor-pointer"
            >
              <span className="text-2xl p-2.5 rounded-lg bg-[#0F1411] border border-[#28352A] flex-shrink-0">
                {item.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#F2F5F3] group-hover:text-[#38A169] transition-colors flex items-center justify-between">
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#38A169] transition-opacity" />
                </p>
                <p className="text-[11px] text-[#9EAC9F] line-clamp-2 mt-1 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trust Badges Footer */}
      <div className="pt-4 flex items-center justify-center gap-6 text-[11px] text-[#8C9A8E] font-mono">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38A169]" />
          <span>AgroAI Diagnostics Engine</span>
        </div>
        <span>•</span>
        <div>98.4% Precision Model</div>
      </div>
    </div>
  );
};
