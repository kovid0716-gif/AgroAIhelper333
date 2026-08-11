import { Language } from './i18n/translations';

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise';

export interface UserSubscription {
  plan: SubscriptionPlan;
  expiresAt?: string;
  scansLimitToday?: number;
  scansUsedToday?: number;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  category: 'Fungicide' | 'Insecticide' | 'Fertilizer' | 'Soil' | 'Tool' | 'Organic';
  description: string;
  priceEstimate: string;
  linkUrl?: string;
  rating?: number;
}

export interface CareGuide {
  wateringSchedule: string;
  humidityLevel: string;
  lightRequirement: string;
  fertilizerNPK: string;
  idealTemperature: string;
  soilType: string;
}

export interface WeatherNote {
  condition: string;
  tempImpact: string;
  humidityWarning: string;
  actionRequired: string;
}

export interface PlantDiagnosis {
  id: string;
  plantName: string;
  botanicalName: string;
  diseaseName: string;
  isHealthy: boolean;
  confidence: number; // 0 - 100
  severity: 'Healthy' | 'Low' | 'Moderate' | 'High' | 'Critical';
  summary: string;
  symptoms: string[];
  treatmentSteps: string[];
  preventativeTips: string[];
  recommendedProducts: ProductRecommendation[];
  careGuide: CareGuide;
  weatherNotes: WeatherNote;
  imageUrl?: string;
  timestamp: string;
  isFavorite?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  imageUrl?: string;
  timestamp: string;
  diagnosis?: PlantDiagnosis;
  isLoading?: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  isDefault?: boolean;
  accuracy: string;
  speed: string;
}

export interface UserSettings {
  temperatureUnit: 'Celsius' | 'Fahrenheit';
  autoSaveHistory: boolean;
  voiceAudioFeedback: boolean;
  cameraQuality: 'HD (1080p)' | 'Ultra (4K)';
  theme: 'Dark Liquid Glass';
  language: Language;
}
