import { AIModel, PlantDiagnosis, UserSettings } from '../types';

export const INITIAL_MODELS: AIModel[] = [
  {
    id: 'agroai-vision-3.6',
    name: 'AgroAI Vision 3.6 Flash',
    tagline: 'Ultra-fast multimodal neural plant diagnosis',
    description: 'Trained on 5M+ agricultural scans. Optimized for real-time leaf disease detection, pest classification & treatment plans.',
    badge: 'Recommended',
    isDefault: true,
    accuracy: '98.4%',
    speed: '< 1.2s',
  },
  {
    id: 'agroai-deep-pro',
    name: 'AgroAI Pro Deep-Agronomy',
    tagline: 'Complex botanical reasoning & soil chemistry analysis',
    description: 'Deep neural reasoning for ambiguous symptoms, root rot analysis, nutrient deficiencies, and complex poly-infections.',
    badge: 'Pro Model',
    isDefault: false,
    accuracy: '99.7%',
    speed: '2.5s',
  },
  {
    id: 'agroai-instant-lite',
    name: 'AgroAI Instant-Scan Lite',
    tagline: 'Lightweight instant plant identification',
    description: 'Ultra-low latency for quick field identification, species tagging, and routine watering checks.',
    badge: 'Fastest',
    isDefault: false,
    accuracy: '94.2%',
    speed: '0.4s',
  },
];

export const PRESET_PROMPTS = [
  {
    label: 'Yellowing leaves on Monstera',
    icon: '🍃',
    text: 'My Monstera Deliciosa leaves are turning yellow with brown crunchy edges. What is causing this and how do I fix it?',
  },
  {
    label: 'Tomato Early Blight Diagnosis',
    icon: '🍅',
    text: 'I noticed dark concentric spots on lower tomato leaves with yellow halos. Is this early blight?',
  },
  {
    label: 'Succulent Overwatering & Rot',
    icon: '🪴',
    text: 'My Echeveria stems feel soft and translucent. How can I save it from root rot?',
  },
  {
    label: 'Orchid Bloom & NPK Guide',
    icon: '🌸',
    text: 'What fertilizer schedule and light levels will trigger my Phalaenopsis orchid to re-bloom?',
  },
];

export const INITIAL_HISTORY: PlantDiagnosis[] = [
  {
    id: 'hist-1',
    plantName: 'Monstera Deliciosa',
    botanicalName: 'Monstera deliciosa Liebm.',
    diseaseName: 'Chlorosis & Sub-optimal Moisture Stress',
    isHealthy: false,
    confidence: 96,
    severity: 'Moderate',
    summary: 'Chlorosis caused by slight nitrogen lockout combined with inconsistent soil drainage near root ball.',
    symptoms: [
      'Lower leaf yellowing with faint brown margins',
      'Slightly soggy potting mix at 3-inch depth',
      'Loss of turgor in mature petioles'
    ],
    treatmentSteps: [
      'Allow top 2 inches of soil to dry completely before next irrigation.',
      'Flush pot with filtered water to dissolve soil mineral salts.',
      'Apply a balanced liquid 20-20-20 fertilizer diluted to 50% strength.',
      'Prune severely yellowed leaves to redistribute energy to active growth.'
    ],
    preventativeTips: [
      'Ensure pot has adequate bottom drainage holes.',
      'Use chunky aroid mix (orchid bark, perlite, peat moss).',
      'Rotate plant 90 degrees weekly for uniform light exposure.'
    ],
    recommendedProducts: [
      {
        id: 'p-1',
        name: 'Aroid Organic Chunk Bark Mix',
        category: 'Soil',
        description: 'Aerated perlite and fir bark blend to eliminate standing water.',
        priceEstimate: '$14.99',
        rating: 4.9
      },
      {
        id: 'p-2',
        name: 'Digital Soil Moisture & pH Probe',
        category: 'Tool',
        description: 'Precision instant 3-in-1 moisture, light, and soil pH reader.',
        priceEstimate: '$18.50',
        rating: 4.8
      }
    ],
    careGuide: {
      wateringSchedule: 'Every 7-10 days when top 50% soil feels dry',
      humidityLevel: '60% - 75% optimal (mist or use humidifier)',
      lightRequirement: 'Bright indirect sunlight (avoid harsh midday direct sun)',
      fertilizerNPK: 'NPK 3-1-2 ratio every 3 weeks during spring/summer',
      idealTemperature: '18°C - 27°C (65°F - 80°F)',
      soilType: 'Chunky, well-draining peat and orchid bark mix'
    },
    weatherNotes: {
      condition: 'Warm / Moderate Indoor Air',
      tempImpact: 'Active foliage growth; water evaporation rate is high.',
      humidityWarning: 'Low indoor air humidity can dry leaf fenestration edges.',
      actionRequired: 'Maintain ambient air humidity around 60% with regular misting.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
    timestamp: '2 hours ago',
    isFavorite: true
  },
  {
    id: 'hist-2',
    plantName: 'Tomato Plant',
    botanicalName: 'Solanum lycopersicum',
    diseaseName: 'Early Blight (Alternaria solani)',
    isHealthy: false,
    confidence: 94,
    severity: 'High',
    summary: 'Fungal leaf spot characterized by target-board concentric leaf lesions starting on lower mature foliage.',
    symptoms: [
      'Dark brown spots with yellow target-like concentric rings',
      'Lower leaves wilting and prematurely dropping',
      'Slight dark stem lesions near lower soil line'
    ],
    treatmentSteps: [
      'Immediately clip and dispose of infected lower leaves. Do not compost.',
      'Apply bio-fungicide containing Copper Octanoate or Bacillus subtilis spray.',
      'Apply mulch around base of plant to prevent soil splashback onto leaves during watering.',
      'Water only at ground level; keep foliage 100% dry.'
    ],
    preventativeTips: [
      'Practice 3-year crop rotation for nightshade family plants.',
      'Space plants at least 24 inches apart for maximum airflow.',
      'Prune lower suckers up to 12 inches above soil.'
    ],
    recommendedProducts: [
      {
        id: 'p-3',
        name: 'Copper Fungicide Liquid Concentrate',
        category: 'Fungicide',
        description: 'OMRI-listed organic copper fungicide for blight and mildews.',
        priceEstimate: '$16.75',
        rating: 4.9
      },
      {
        id: 'p-4',
        name: 'Organic Neem Oil Cold-Pressed Spray',
        category: 'Organic',
        description: 'Natural dual-action fungicide and pest repellent.',
        priceEstimate: '$12.99',
        rating: 4.7
      }
    ],
    careGuide: {
      wateringSchedule: 'Deep watering every 2-3 days at base',
      humidityLevel: '40% - 60% (High humidity accelerates fungal spores)',
      lightRequirement: 'Full sun (minimum 8 hours direct daily sunlight)',
      fertilizerNPK: 'NPK 5-10-10 low nitrogen high potassium for fruiting',
      idealTemperature: '21°C - 29°C (70°F - 85°F)',
      soilType: 'Rich loam enriched with compost, pH 6.2 - 6.8'
    },
    weatherNotes: {
      condition: 'Humid Summer Rain',
      tempImpact: 'Warm temperatures above 24°C favor spore germination.',
      humidityWarning: 'High ambient humidity after rain increases spore spread.',
      actionRequired: 'Apply copper spray immediately after dry weather returns.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80',
    timestamp: 'Yesterday',
    isFavorite: false
  },
  {
    id: 'hist-3',
    plantName: 'Fiddle Leaf Fig',
    botanicalName: 'Ficus lyrata',
    diseaseName: 'Optimal Leaf Health & Routine Care',
    isHealthy: true,
    confidence: 99,
    severity: 'Healthy',
    summary: 'Plant shows vibrant green, thick glossy leaves with strong cellular structure and no signs of pest or pathogen infestation.',
    symptoms: [
      'No lesions, spots, or discoloration',
      'Glossy cuticle with intact leaf veins',
      'Firm vertical trunk stability'
    ],
    treatmentSteps: [
      'Maintain current excellent care regimen.',
      'Wipe down leaves monthly with damp microfiber cloth to clear dust buildup.',
      'Check under side of mature leaves bi-weekly for spider mite prevention.'
    ],
    preventativeTips: [
      'Keep plant away from cold drafts or air conditioner vents.',
      'Do not relocate frequently; Ficus lyrata is sensitive to environmental shifts.'
    ],
    recommendedProducts: [
      {
        id: 'p-5',
        name: 'Microfiber Leaf Cleaning Gloves',
        category: 'Tool',
        description: 'Ultra-soft microfiber gloves designed for broadleaf dusting.',
        priceEstimate: '$9.99',
        rating: 4.8
      }
    ],
    careGuide: {
      wateringSchedule: 'Water when top 2-3 inches of soil is completely dry',
      humidityLevel: '50% - 60% relative humidity',
      lightRequirement: 'Bright consistent indirect light in south/east window',
      fertilizerNPK: 'NPK 3-1-2 liquid fertilizer once a month in spring/summer',
      idealTemperature: '18°C - 26°C (65°F - 78°F)',
      soilType: 'Fast-draining potting soil with perlite and coconut coir'
    },
    weatherNotes: {
      condition: 'Stable Moderate Climate',
      tempImpact: 'Ideal range for leaf expansion.',
      humidityWarning: 'Stable humidity level supported.',
      actionRequired: 'No emergency interventions needed.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80',
    timestamp: '3 days ago',
    isFavorite: true
  }
];

export const DEFAULT_USER_SETTINGS: UserSettings = {
  temperatureUnit: 'Celsius',
  autoSaveHistory: true,
  voiceAudioFeedback: true,
  cameraQuality: 'HD (1080p)',
  theme: 'Dark Liquid Glass',
  language: 'en',
};
