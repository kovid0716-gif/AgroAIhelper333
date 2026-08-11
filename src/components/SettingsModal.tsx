import React from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { UserSettings } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
  language?: Language;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#151B17] border border-[#28352A] rounded-xl p-6 space-y-5 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#28352A] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#2E7D32]/20 border border-[#2E7D32] text-[#38A169]">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#F2F5F3] text-base">{t.settingsTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1D2620] text-[#8C9A8E] hover:text-[#F2F5F3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-3 text-xs">
          {/* App Language Selector */}
          <div className="p-3 rounded-lg bg-[#111612] border border-[#28352A] flex items-center justify-between">
            <div>
              <p className="font-bold text-[#F2F5F3] text-sm">{t.languageLabel}</p>
              <p className="text-[#8C9A8E]">{t.languageDesc}</p>
            </div>
            <div className="flex items-center gap-1 p-0.5 bg-[#0F1411] rounded-lg border border-[#263328]">
              <button
                onClick={() => onUpdateSettings({ ...settings, language: 'en' })}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  settings.language === 'en'
                    ? 'bg-[#2E7D32] text-white'
                    : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onUpdateSettings({ ...settings, language: 'ru' })}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  settings.language === 'ru'
                    ? 'bg-[#2E7D32] text-white'
                    : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => onUpdateSettings({ ...settings, language: 'kk' })}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  settings.language === 'kk'
                    ? 'bg-[#2E7D32] text-white'
                    : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
                }`}
              >
                КАЗ
              </button>
            </div>
          </div>

          {/* Temperature Unit */}
          <div className="p-3 rounded-lg bg-[#111612] border border-[#28352A] flex items-center justify-between">
            <div>
              <p className="font-bold text-[#F2F5F3] text-sm">{t.tempUnitLabel}</p>
            </div>
            <div className="flex items-center gap-1 p-0.5 bg-[#0F1411] rounded-lg border border-[#263328]">
              <button
                onClick={() => onUpdateSettings({ ...settings, temperatureUnit: 'Celsius' })}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  settings.temperatureUnit === 'Celsius'
                    ? 'bg-[#2E7D32] text-white'
                    : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => onUpdateSettings({ ...settings, temperatureUnit: 'Fahrenheit' })}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  settings.temperatureUnit === 'Fahrenheit'
                    ? 'bg-[#2E7D32] text-white'
                    : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
                }`}
              >
                °F
              </button>
            </div>
          </div>

          {/* Auto Save History */}
          <div className="p-3 rounded-lg bg-[#111612] border border-[#28352A] flex items-center justify-between">
            <div>
              <p className="font-bold text-[#F2F5F3] text-sm">{t.autoSaveLabel}</p>
              <p className="text-[#8C9A8E]">{t.autoSaveDesc}</p>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, autoSaveHistory: !settings.autoSaveHistory })}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                settings.autoSaveHistory ? 'bg-[#38A169]' : 'bg-[#263328]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.autoSaveHistory ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Camera Quality */}
          <div className="p-3 rounded-lg bg-[#111612] border border-[#28352A] flex items-center justify-between">
            <div>
              <p className="font-bold text-[#F2F5F3] text-sm">{t.cameraResLabel}</p>
            </div>
            <select
              value={settings.cameraQuality}
              onChange={(e) => onUpdateSettings({ ...settings, cameraQuality: e.target.value as any })}
              className="bg-[#0F1411] border border-[#263328] text-[#F2F5F3] font-semibold rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#38A169]"
            >
              <option value="HD (1080p)">HD (1080p)</option>
              <option value="Ultra (4K)">Ultra (4K)</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-1">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg field-button-primary font-semibold text-xs transition-colors"
          >
            {t.savePrefs}
          </button>
        </div>
      </div>
    </div>
  );
};
