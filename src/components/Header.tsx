import React from 'react';
import { Menu, RefreshCw, Cpu, Globe } from 'lucide-react';
import { AIModel } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenSidebar: () => void;
  onOpenModels: () => void;
  onOpenCamera: () => void;
  onReset: () => void;
  currentModel: AIModel;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSidebar,
  onOpenModels,
  onReset,
  currentModel,
  language,
  onSelectLanguage,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#131915] border-b border-[#263328] px-4 py-3 flex items-center justify-between shadow-sm">
      {/* Left Menu & Status */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg bg-[#1D2620] border border-[#2F3E32] text-[#F2F5F3] hover:bg-[#263328] transition-colors cursor-pointer"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="lg:hidden">
          <Logo size="sm" variant="full" showSubtext={false} />
        </div>
      </div>

      {/* Center Model Selector */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={onOpenModels}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A221C] border border-[#28352A] hover:border-[#38A169] text-xs text-[#9EAC9F] hover:text-[#F2F5F3] transition-colors cursor-pointer"
        >
          <Cpu className="w-3.5 h-3.5 text-[#38A169]" />
          <span className="font-semibold text-[#F2F5F3] tracking-wide">{currentModel.name}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2E7D32]/20 text-[#38A169] font-mono font-bold">
            {currentModel.speed}
          </span>
        </button>
      </div>

      {/* Right Quick Actions: Language Selector & Reset */}
      <div className="flex items-center gap-2">
        {/* Language Switcher Pills */}
        <div className="flex items-center p-0.5 rounded-lg bg-[#0F1411] border border-[#263328]">
          <Globe className="w-3.5 h-3.5 text-[#38A169] ml-2 mr-1" />
          <button
            onClick={() => onSelectLanguage('en')}
            className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
              language === 'en'
                ? 'bg-[#2E7D32] text-white'
                : 'text-[#9EAC9F] hover:text-[#F2F5F3]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onSelectLanguage('ru')}
            className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
              language === 'ru'
                ? 'bg-[#2E7D32] text-white'
                : 'text-[#9EAC9F] hover:text-[#F2F5F3]'
            }`}
          >
            RU
          </button>
          <button
            onClick={() => onSelectLanguage('kk')}
            className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
              language === 'kk'
                ? 'bg-[#2E7D32] text-white'
                : 'text-[#9EAC9F] hover:text-[#F2F5F3]'
            }`}
          >
            КАЗ
          </button>
        </div>

        <button
          onClick={onReset}
          className="p-2 rounded-lg bg-[#1A221C] border border-[#28352A] text-[#9EAC9F] hover:text-[#F2F5F3] hover:bg-[#263328] transition-colors cursor-pointer"
          title={t.resetChat}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
