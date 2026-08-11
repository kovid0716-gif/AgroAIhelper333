import React, { useState } from 'react';
import { 
  Sprout, 
  AlertTriangle, 
  Droplets, 
  Sun, 
  Thermometer, 
  ShieldCheck, 
  ShoppingBag, 
  CloudSun, 
  Star, 
  Copy, 
  Check, 
  BellRing, 
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PlantDiagnosis } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface AnalysisResultCardProps {
  diagnosis: PlantDiagnosis;
  onToggleFavorite?: (id: string, e: React.MouseEvent) => void;
  onAskFollowUp?: (plantName: string) => void;
  onSetReminder?: (plantName: string) => void;
  language?: Language;
}

export const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({
  diagnosis,
  onToggleFavorite,
  onAskFollowUp,
  onSetReminder,
  language = 'en',
}) => {
  const [copied, setCopied] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<'treatment' | 'care' | 'products' | 'weather'>('treatment');
  const t = TRANSLATIONS[language];

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCopyReport = () => {
    const reportText = `AgroAI Diagnostic Report
Plant: ${diagnosis.plantName} (${diagnosis.botanicalName})
Issue: ${diagnosis.diseaseName}
Confidence: ${diagnosis.confidence}% | Severity: ${diagnosis.severity}
Summary: ${diagnosis.summary}

Treatment Steps:
${diagnosis.treatmentSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Care Guide:
• Watering: ${diagnosis.careGuide.wateringSchedule}
• Light: ${diagnosis.careGuide.lightRequirement}
• Fertilizer NPK: ${diagnosis.careGuide.fertilizerNPK}`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'healthy':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800';
      case 'low':
        return 'bg-blue-950/80 text-blue-400 border-blue-800';
      case 'moderate':
        return 'bg-amber-950/80 text-amber-400 border-amber-800';
      case 'high':
        return 'bg-orange-950/80 text-orange-400 border-orange-800';
      case 'critical':
        return 'bg-red-950/80 text-red-400 border-red-800';
      default:
        return 'bg-[#2E7D32]/30 text-[#38A169] border-[#2E7D32]';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-4 rounded-xl field-card overflow-hidden transition-all animate-fade-in">
      {/* Top Banner with Image and Diagnosis Title */}
      <div className="p-5 md:p-6 bg-[#111612] border-b border-[#28352A]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Plant Image & Metrics Header */}
          <div className="flex items-start gap-4">
            {diagnosis.imageUrl ? (
              <div className="w-20 h-20 md:w-22 md:h-22 rounded-lg border border-[#28352A] overflow-hidden flex-shrink-0 relative group">
                <img
                  src={diagnosis.imageUrl}
                  alt={diagnosis.plantName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 md:w-22 md:h-22 rounded-lg bg-[#1A221C] border border-[#28352A] flex items-center justify-center text-[#38A169] flex-shrink-0">
                <Sprout className="w-8 h-8" />
              </div>
            )}

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider ${getSeverityBadge(diagnosis.severity)}`}>
                  {diagnosis.severity} {t.severityLabel}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#1D2620] border border-[#2B3A2E] text-[#F2F5F3]">
                  {diagnosis.confidence}% {t.confidenceLabel}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-[#F2F5F3] tracking-tight">
                {diagnosis.plantName}
              </h2>
              <p className="text-xs text-[#8C9A8E] italic font-serif">
                {diagnosis.botanicalName}
              </p>

              <div className="mt-2 flex items-center gap-2 bg-[#1A221C] border border-[#28352A] px-2.5 py-1 rounded w-fit">
                <span className="text-xs font-semibold text-[#38A169]">
                  {t.diagnosisLabel}:
                </span>
                <span className="text-xs font-bold text-[#F2F5F3]">
                  {diagnosis.diseaseName}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Icons */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            {onToggleFavorite && (
              <button
                onClick={(e) => onToggleFavorite(diagnosis.id, e)}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  diagnosis.isFavorite
                    ? 'bg-amber-950/60 border-amber-800 text-amber-400'
                    : 'bg-[#1D2620] border-[#2B3A2E] text-[#8C9A8E] hover:text-[#F2F5F3]'
                }`}
                title={diagnosis.isFavorite ? 'Unstar diagnosis' : 'Star diagnosis'}
              >
                <Star className={`w-4 h-4 ${diagnosis.isFavorite ? 'fill-amber-400' : ''}`} />
              </button>
            )}

            <button
              onClick={handleCopyReport}
              className="p-2 rounded-lg bg-[#1D2620] border border-[#2B3A2E] text-[#8C9A8E] hover:text-[#F2F5F3] transition-colors cursor-pointer"
              title="Copy diagnosis report"
            >
              {copied ? <Check className="w-4 h-4 text-[#38A169]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <p className="mt-4 text-xs md:text-sm text-[#9EAC9F] leading-relaxed bg-[#151B17] p-3.5 rounded-lg border border-[#28352A]">
          {diagnosis.summary}
        </p>

        {/* Symptoms Checklist Cards */}
        {diagnosis.symptoms && diagnosis.symptoms.length > 0 && (
          <div className="mt-4">
            <p className="text-[11px] font-bold text-[#8C9A8E] mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.symptomsHeader}</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {diagnosis.symptoms.map((symp, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#F2F5F3] bg-[#151B17] p-2.5 rounded-lg border border-[#28352A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{symp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Tabs Header */}
      <div className="px-5 pt-3 border-b border-[#28352A] flex items-center gap-1 overflow-x-auto custom-scrollbar bg-[#111612]">
        <button
          onClick={() => setActiveTab('treatment')}
          className={`px-3.5 py-2 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'treatment'
              ? 'bg-[#151B17] text-[#38A169] border-t-2 border-[#38A169]'
              : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{t.tabTreatment}</span>
        </button>

        <button
          onClick={() => setActiveTab('care')}
          className={`px-3.5 py-2 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'care'
              ? 'bg-[#151B17] text-[#38A169] border-t-2 border-[#38A169]'
              : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>{t.tabCare}</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-3.5 py-2 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'products'
              ? 'bg-[#151B17] text-[#38A169] border-t-2 border-[#38A169]'
              : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t.tabProducts} ({diagnosis.recommendedProducts?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`px-3.5 py-2 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'weather'
              ? 'bg-[#151B17] text-[#38A169] border-t-2 border-[#38A169]'
              : 'text-[#8C9A8E] hover:text-[#F2F5F3]'
          }`}
        >
          <CloudSun className="w-4 h-4" />
          <span>{t.tabWeather}</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-5">
        {/* Tab 1: Step-by-Step Treatment Plan */}
        {activeTab === 'treatment' && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-xs font-medium text-[#8C9A8E]">
              {t.treatmentCheckHint}
            </p>

            <div className="space-y-2">
              {diagnosis.treatmentSteps.map((step, idx) => {
                const isChecked = completedSteps[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-[#1D2620] border-[#38A169]/40 text-[#8C9A8E] line-through'
                        : 'bg-[#1A221C] border-[#28352A] text-[#F2F5F3] hover:border-[#38A169]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? 'bg-[#38A169] border-[#38A169] text-white'
                        : 'border-[#2B3A2E] bg-[#0F1411]'
                    }`}>
                      {isChecked && <Check className="w-3 h-3" />}
                    </div>
                    <div className="text-xs leading-relaxed">
                      <span className="font-bold mr-1.5 text-[#38A169]">Шаг {idx + 1}:</span>
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Preventative Tips Box */}
            {diagnosis.preventativeTips && (
              <div className="mt-4 p-3.5 rounded-lg bg-[#111612] border border-[#28352A]">
                <p className="text-xs font-bold text-[#38A169] mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {t.preventionTitle}
                </p>
                <ul className="space-y-1 text-xs text-[#9EAC9F] list-disc list-inside">
                  {diagnosis.preventativeTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Care Guide Grid */}
        {activeTab === 'care' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 animate-fade-in">
            {/* Watering */}
            <div className="p-3.5 rounded-lg bg-[#111612] border border-[#28352A]">
              <div className="flex items-center gap-2 text-[#38A169] mb-1.5">
                <Droplets className="w-4 h-4" />
                <span className="text-xs font-bold text-[#F2F5F3] uppercase tracking-wider">{t.careWatering}</span>
              </div>
              <p className="text-xs text-[#9EAC9F] leading-relaxed">
                {diagnosis.careGuide.wateringSchedule}
              </p>
            </div>

            {/* Humidity */}
            <div className="p-3.5 rounded-lg bg-[#111612] border border-[#28352A]">
              <div className="flex items-center gap-2 text-teal-400 mb-1.5">
                <CloudSun className="w-4 h-4" />
                <span className="text-xs font-bold text-[#F2F5F3] uppercase tracking-wider">{t.careHumidity}</span>
              </div>
              <p className="text-xs text-[#9EAC9F] leading-relaxed">
                {diagnosis.careGuide.humidityLevel}
              </p>
            </div>

            {/* Sunlight */}
            <div className="p-3.5 rounded-lg bg-[#111612] border border-[#28352A]">
              <div className="flex items-center gap-2 text-amber-400 mb-1.5">
                <Sun className="w-4 h-4" />
                <span className="text-xs font-bold text-[#F2F5F3] uppercase tracking-wider">{t.careLight}</span>
              </div>
              <p className="text-xs text-[#9EAC9F] leading-relaxed">
                {diagnosis.careGuide.lightRequirement}
              </p>
            </div>

            {/* Fertilizer NPK */}
            <div className="p-3.5 rounded-lg bg-[#111612] border border-[#28352A]">
              <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
                <Sprout className="w-4 h-4" />
                <span className="text-xs font-bold text-[#F2F5F3] uppercase tracking-wider">{t.careFertilizer}</span>
              </div>
              <p className="text-xs text-[#9EAC9F] leading-relaxed">
                {diagnosis.careGuide.fertilizerNPK}
              </p>
            </div>

            {/* Temperature */}
            <div className="p-3.5 rounded-lg bg-[#111612] border border-[#28352A]">
              <div className="flex items-center gap-2 text-rose-400 mb-1.5">
                <Thermometer className="w-4 h-4" />
                <span className="text-xs font-bold text-[#F2F5F3] uppercase tracking-wider">{t.careTemp}</span>
              </div>
              <p className="text-xs text-[#9EAC9F] leading-relaxed">
                {diagnosis.careGuide.idealTemperature}
              </p>
            </div>

            {/* Soil Type */}
            <div className="p-3.5 rounded-lg bg-[#111612] border border-[#28352A]">
              <div className="flex items-center gap-2 text-amber-500 mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-[#F2F5F3] uppercase tracking-wider">{t.careSoil}</span>
              </div>
              <p className="text-xs text-[#9EAC9F] leading-relaxed">
                {diagnosis.careGuide.soilType}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Recommended Products */}
        {activeTab === 'products' && (
          <div className="space-y-2.5 animate-fade-in">
            {diagnosis.recommendedProducts?.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-lg bg-[#111612] border border-[#28352A] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#2E7D32]/20 text-[#38A169] border border-[#2E7D32]">
                      {prod.category}
                    </span>
                    {prod.rating && (
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        ★ {prod.rating}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-[#F2F5F3]">{prod.name}</h4>
                  <p className="text-xs text-[#9EAC9F] leading-relaxed">{prod.description}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-auto">
                  <span className="text-xs font-bold text-[#F2F5F3]">{prod.priceEstimate}</span>
                  <button
                    onClick={() => alert(`Redirecting to product source for: ${prod.name}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg field-button-primary text-xs font-semibold cursor-pointer"
                  >
                    <span>{t.viewProduct}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Weather & Climate Impact */}
        {activeTab === 'weather' && (
          <div className="p-4 rounded-lg bg-[#111612] border border-[#28352A] space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-sky-400">
              <CloudSun className="w-4 h-4" />
              <h4 className="text-xs font-bold text-[#F2F5F3]">{t.weatherTitle}</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-[#151B17] rounded-lg border border-[#28352A]">
                <p className="text-[#8C9A8E] font-medium">{t.weatherCondition}</p>
                <p className="text-[#F2F5F3] font-bold text-xs mt-0.5">{diagnosis.weatherNotes.condition}</p>
              </div>

              <div className="p-3 bg-[#151B17] rounded-lg border border-[#28352A]">
                <p className="text-[#8C9A8E] font-medium">{t.weatherTempImpact}</p>
                <p className="text-[#F2F5F3] font-medium mt-0.5">{diagnosis.weatherNotes.tempImpact}</p>
              </div>

              <div className="p-3 bg-[#151B17] rounded-lg border border-[#28352A]">
                <p className="text-[#8C9A8E] font-medium">{t.weatherHumidityAlert}</p>
                <p className="text-[#F2F5F3] font-medium mt-0.5">{diagnosis.weatherNotes.humidityWarning}</p>
              </div>

              <div className="p-3 bg-[#1D2620] rounded-lg border border-[#38A169]">
                <p className="text-[#38A169] font-bold">{t.weatherActionRequired}</p>
                <p className="text-[#F2F5F3] font-medium mt-0.5">{diagnosis.weatherNotes.actionRequired}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Follow-up & Reminder Footer */}
      <div className="p-3.5 bg-[#111612] border-t border-[#28352A] flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => onAskFollowUp && onAskFollowUp(diagnosis.plantName)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D2620] hover:bg-[#253227] border border-[#2B3A2E] text-[#F2F5F3] text-xs font-medium transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#38A169]" />
          <span>{t.askFollowUp}</span>
        </button>

        <button
          onClick={() => onSetReminder && onSetReminder(diagnosis.plantName)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E7D32]/20 hover:bg-[#2E7D32]/30 text-[#38A169] border border-[#2E7D32] text-xs font-semibold transition-colors cursor-pointer"
        >
          <BellRing className="w-3.5 h-3.5" />
          <span>{t.setReminder}</span>
        </button>
      </div>
    </div>
  );
};
