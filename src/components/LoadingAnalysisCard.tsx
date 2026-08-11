import React, { useEffect, useState } from 'react';
import { Sprout, CheckCircle2, Loader2, Cpu } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface LoadingAnalysisCardProps {
  language?: Language;
}

export const LoadingAnalysisCard: React.FC<LoadingAnalysisCardProps> = ({ language = 'en' }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const t = TRANSLATIONS[language];

  const steps = [
    { label: language === 'ru' ? '🌿 Определение растения...' : language === 'kk' ? '🌿 Өсімдікті анықтау...' : '🌿 Detecting plant...', icon: '🌿' },
    { label: language === 'ru' ? '🔬 Диагностика заболевания...' : language === 'kk' ? '🔬 Ауруды сәйкестендіру...' : '🔬 Identifying disease...', icon: '🔬' },
    { label: language === 'ru' ? '🧬 Сравнение симптомов...' : language === 'kk' ? '🧬 Симптомдарды салыстыру...' : '🧬 Comparing symptoms...', icon: '🧬' },
    { label: language === 'ru' ? '💧 Расчет полива...' : language === 'kk' ? '💧 Суаруды есептеу...' : '💧 Calculating watering...', icon: '💧' },
    { label: language === 'ru' ? '🧪 Подбор удобрений...' : language === 'kk' ? '🧪 Тыңайтқыш таңдау...' : '🧪 Selecting fertilizer...', icon: '🧪' },
    { label: language === 'ru' ? '📈 Расчет точности...' : language === 'kk' ? '📈 Сенімділік талдауы...' : '📈 Confidence analysis...', icon: '📈' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(interval);
  }, [steps.length]);

  const progressPercent = Math.min(Math.round(((currentStepIndex + 1) / steps.length) * 100), 100);

  return (
    <div className="w-full max-w-3xl mx-auto my-6 p-6 rounded-xl field-card animate-fade-in">
      <div className="flex flex-col items-center text-center space-y-5">
        {/* Spinner Hub */}
        <div className="w-12 h-12 rounded-xl bg-[#1D2620] border border-[#38A169] flex items-center justify-center text-[#38A169]">
          <Sprout className="w-6 h-6" />
        </div>

        {/* Status Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#2E7D32]/20 text-[#38A169] text-xs font-semibold">
            <span>{t.scannerActive}</span>
          </div>

          <h3 className="text-lg font-bold text-[#F2F5F3]">
            AgroAI Diagnostics Engine
          </h3>
          <p className="text-xs text-[#8C9A8E] font-mono flex items-center justify-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#38A169]" />
            <span>Анализ параметров растения ({progressPercent}%)</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md h-2 bg-[#0F1411] rounded-full overflow-hidden border border-[#28352A]">
          <div
            className="h-full bg-[#38A169] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step-by-Step Cards */}
        <div className="w-full max-w-md space-y-1.5 text-left bg-[#111612] p-3 rounded-lg border border-[#28352A]">
          {steps.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                  isDone
                    ? 'bg-[#1D2620] text-[#38A169]'
                    : isCurrent
                    ? 'bg-[#151B17] text-[#F2F5F3] border border-[#38A169]'
                    : 'text-[#8C9A8E]/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{step.icon}</span>
                  <span>{step.label}</span>
                </div>

                <div>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-[#38A169]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#38A169] animate-spin" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-[#28352A]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
