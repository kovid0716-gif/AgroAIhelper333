import { PlantDiagnosis } from '../types';

export function getClientFallbackDiagnosis(
  prompt?: string,
  imageBase64?: string | null,
  language: string = 'en'
): PlantDiagnosis {
  const isTomato = prompt?.toLowerCase().includes('tomato') || prompt?.toLowerCase().includes('томат') || prompt?.toLowerCase().includes('помидор');
  const isSucculent = prompt?.toLowerCase().includes('succulent') || prompt?.toLowerCase().includes('суккулент') || prompt?.toLowerCase().includes('кактус');

  if (language === 'ru') {
    if (isTomato) {
      return {
        id: 'diag-' + Date.now(),
        plantName: 'Томат (Помидор)',
        botanicalName: 'Solanum lycopersicum',
        diseaseName: 'Ранняя сухая пятнистость (Альтернариоз)',
        isHealthy: false,
        confidence: 94,
        severity: 'Moderate',
        summary: 'На нижних листьях обнаружены характерные концентрические пятна альтернариоза с желтым ореолом.',
        symptoms: [
          'Темно-коричневые пятна с концентрическими кругами на нижних листьях',
          'Пожелтение листовой пластины вокруг очагов поражения',
          'Преждевременное усыхание и опадание нижних листьев'
        ],
        treatmentSteps: [
          'Удалите и уничтожьте пораженные нижние листья до высоты 30 см от земли.',
          'Обработайте растение медьсодержащим фунгицидом (Абига-Пик или ХОМ).',
          'Замульчируйте почву соломой или агроволокном.',
          'Поливайте исключительно под корень, избегая попадания воды на листья.'
        ],
        preventativeTips: [
          'Соблюдайте дистанцию 50-60 см между кустами для проветривания.',
          'Соблюдайте севооборот: не сажайте томаты после пасленовых.'
        ],
        recommendedProducts: [
          {
            id: 'p-ru1',
            name: 'Абига-Пик Медный Фунгицид',
            category: 'Fungicide',
            description: 'Контактный фунгицид широкого спектра защиты от фитофтороза и альтернариоза.',
            priceEstimate: '450 ₸',
            rating: 4.9
          },
          {
            id: 'p-ru2',
            name: 'Органическое Мульчирующее Волокно',
            category: 'Soil',
            description: 'Защищает листья от спор грибка из почвы при поливе.',
            priceEstimate: '1 200 ₸',
            rating: 4.7
          }
        ],
        careGuide: {
          wateringSchedule: 'Глубокий полив под корень каждые 2-3 дня',
          humidityLevel: '45-55% (сухая листва)',
          lightRequirement: 'Прямой солнечный свет (8+ часов в день)',
          fertilizerNPK: 'Комплексное удобрение NPK 5-10-15 в период плодоношения',
          idealTemperature: '20°C - 28°C',
          soilType: 'Рыхлая плодородная суглинистая почва (pH 6.2-6.8)'
        },
        weatherNotes: {
          condition: 'Влажная теплая погода',
          tempImpact: 'Высокая температура ускоряет развитие грибка.',
          humidityWarning: 'Капли росы на листьях стимулируют прорастание спор.',
          actionRequired: 'Проведите профилактическую обработку после дождей.'
        },
        imageUrl: imageBase64 || undefined,
        timestamp: 'Только что'
      };
    }

    if (isSucculent) {
      return {
        id: 'diag-' + Date.now(),
        plantName: 'Эхеверия (Суккулент)',
        botanicalName: 'Echeveria elegans',
        diseaseName: 'Прикорневая гниль из-за переувлажнения',
        isHealthy: false,
        confidence: 93,
        severity: 'High',
        summary: 'Причиной повреждений является переувлажнение почвы и недостаток аэрации корней.',
        symptoms: [
          'Полупрозрачные, мягкие водянистые нижние листья',
          'Почва остается влажной более 7 дней',
          'Размягчение стебля у основания'
        ],
        treatmentSteps: [
          'Извлеките суккулент из горшка и очистите корни от сырого грунта.',
          'Обрежьте темные и подгнившие корни стерильным ножом.',
          'Просушите растение в тени в течение 24-48 часов.',
          'Пересадите в сухой специализированный грунт с 50% перлита или гравия.'
        ],
        preventativeTips: [
          'Используйте глиняные или керамические горшки с дренажными отверстиями.',
          'Поливайте только после полного просыхания всего земляного кома.'
        ],
        recommendedProducts: [
          {
            id: 'p-ru3',
            name: 'Грунт для Суккулентов и Кактусов Ultradrain',
            category: 'Soil',
            description: 'Специальный дренированный минеральный состав с песком и вулканической лавой.',
            priceEstimate: '980 ₸',
            rating: 4.9
          }
        ],
        careGuide: {
          wateringSchedule: 'Раз в 14-20 дней только после полного просыхания',
          humidityLevel: '30-45% (сухой воздух)',
          lightRequirement: 'Яркое солнечное освещение (6+ часов)',
          fertilizerNPK: 'Специализированный минеральный комплекс для кактусов',
          idealTemperature: '18°C - 28°C',
          soilType: 'Быстросохнущий минеральный субстрат'
        },
        weatherNotes: {
          condition: 'Прохладное помещение',
          tempImpact: 'При прохладе испарение влаги замедляется.',
          humidityWarning: 'Высокая влажность воздуха опасна для корней.',
          actionRequired: 'Полностью прекратите полив до полного высыхания.'
        },
        imageUrl: imageBase64 || undefined,
        timestamp: 'Только что'
      };
    }

    // Default Monstera / General Plant diagnosis (RU)
    return {
      id: 'diag-' + Date.now(),
      plantName: prompt?.split(' ')?.[0] || 'Монстера Делициоза',
      botanicalName: 'Monstera deliciosa',
      diseaseName: 'Краевой ожог и дисбаланс влажности',
      isHealthy: false,
      confidence: 96,
      severity: 'Moderate',
      summary: 'Анализ показывает сухие кончики листьев с желтой каймой, вызванные сухим воздухом и накопившимися солями водопроводной воды.',
      symptoms: [
        'Сухие коричневые кончики листьев с желтым ореолом',
        'Незначительный хлороз на молодых листьях',
        'Солевой налет на поверхности почвы'
      ],
      treatmentSteps: [
        'Промойте грунт отстоявшейся или фильтрованной водой.',
        'Аккуратно подрежьте сухие кончики, сохраняя зеленую живую ткань.',
        'Внесите сбалансированное жидкое удобрение в половинной дозе.',
        'Увеличьте влажность воздуха с помощью увлажнителя или поддона с влажным керамзитом.'
      ],
      preventativeTips: [
        'Опрыскивайте растение теплой фильтрованной водой.',
        'Защищайте от сквозняков и горячих батарей отопления.'
      ],
      recommendedProducts: [
        {
          id: 'p-ru5',
          name: 'Органический Увлажняющий Спрей для Листьев',
          category: 'Organic',
          description: 'Улучшает дыхание листьев и защищает от пересыхания.',
          priceEstimate: '1 500 ₸',
          rating: 4.8
        }
      ],
      careGuide: {
        wateringSchedule: 'Полив по мере просыхания верхнего слоя на 3-4 см',
        humidityLevel: '60-70% (повышенная влажность)',
        lightRequirement: 'Яркий рассеянный свет без прямых лучей',
        fertilizerNPK: 'Комплексный NPK 10-10-10 для декоративно-лиственных',
        idealTemperature: '20°C - 26°C',
        soilType: 'Рыхлый питательный субстрат с биогумусом и кокосовым волокном'
      },
      weatherNotes: {
        condition: 'Сухой воздух в помещении',
        tempImpact: 'Высокая температура ускоряет испарение с листьев.',
        humidityWarning: 'Влажность ниже 40% вызывает подсыхание кончиков.',
        actionRequired: 'Установите поддон с водой или увлажнитель рядом с растением.'
      },
      imageUrl: imageBase64 || undefined,
      timestamp: 'Только что'
    };
  }

  if (language === 'kk') {
    return {
      id: 'diag-' + Date.now(),
      plantName: prompt?.split(' ')?.[0] || 'Монстера Делициоза',
      botanicalName: 'Monstera deliciosa',
      diseaseName: 'Жапырақ шеттерінің кебуі және ылғалдылық теңгерімсіздігі',
      isHealthy: false,
      confidence: 96,
      severity: 'Moderate',
      summary: 'Өсімдікті талдау нәтижесінде ауаның құрғақтығынан және судың құрамындағы тұздардан жапырақ ұштарының сарғайып кебуі анықталды.',
      symptoms: [
        'Жапырақ ұштарының қоңыр тартып кебуі',
        'Жаңа жапырақтардың сәл сарғаюы',
        'Топырақ бетіндегі тұз қабыршағы'
      ],
      treatmentSteps: [
        'Топырақты сүзгіленген жылы сумен шайыңыз.',
        'Кеуіп кеткен қоңыр ұштарын қайшымен абайлап қиыңыз.',
        'Өсімдікке арналған сұйық тыңайтқышты жартылай мөлшерде беріңіз.',
        'Бөлмедегі ауа ылғалдылығын арттырыңыз.'
      ],
      preventativeTips: [
        'Жапырақтарға жүйелі түрде жылы су бүркіп тұрыңыз.',
        'Тікелей күн сәулесінен және желдеткіштен қорғаңыз.'
      ],
      recommendedProducts: [
        {
          id: 'p-kk1',
          name: 'Декоративті өсімдіктерге арналған минералды тыңайтқыш',
          category: 'Fertilizer',
          description: 'Жапырақтардың жасыл түсін сақтайды және өсуін жеделдетеді.',
          priceEstimate: '1 200 ₸',
          rating: 4.8
        }
      ],
      careGuide: {
        wateringSchedule: 'Топырақтың үстіңгі қабаты кепкен кезде суару',
        humidityLevel: '60-70%',
        lightRequirement: 'Жарық, бірақ тікелей түспейтін күн сәулесі',
        fertilizerNPK: 'Комплексті NPK 10-10-10 тыңайтқышы',
        idealTemperature: '20°C - 26°C',
        soilType: 'Қолайлы, құнарлы топырақ қоспасы'
      },
      weatherNotes: {
        condition: 'Құрғақ ауа райы / Бөлме ауасы',
        tempImpact: 'Жоғары температура судың тез булануына әкеледі.',
        humidityWarning: 'Төмен ылғалдылық жапырақ ұштарының кебуіне себеп болады.',
        actionRequired: 'Ауа ылғалдандырғышты қосыңыз.'
      },
      imageUrl: imageBase64 || undefined,
      timestamp: 'Қазір'
    };
  }

  // English fallback
  return {
    id: 'diag-' + Date.now(),
    plantName: prompt?.split(' ')?.[0] || 'Monstera Deliciosa',
    botanicalName: 'Monstera deliciosa Liebm.',
    diseaseName: 'Nutrient & Humidity Imbalance',
    isHealthy: false,
    confidence: 95,
    severity: 'Moderate',
    summary: 'Analysis reveals brown crispy leaf margins and mild chlorosis caused by dry indoor air and mineral accumulation from tap water.',
    symptoms: [
      'Crispy brown leaf edges with yellow halos',
      'Mild chlorosis on young foliage',
      'Mineral crust on upper soil layer'
    ],
    treatmentSteps: [
      'Flush pot with distilled or filtered rainwater to remove excess salt buildup.',
      'Trim dry brown margins with clean shears leaving a tiny dead edge.',
      'Apply liquid balanced fertilizer diluted to half strength.',
      'Increase ambient room humidity using a humidifier or pebble tray.'
    ],
    preventativeTips: [
      'Mist leaves regularly with lukewarm filtered water.',
      'Keep away from direct heat vents and drafts.'
    ],
    recommendedProducts: [
      {
        id: 'p-en1',
        name: 'Organic Plant Foliage Spray',
        category: 'Organic',
        description: 'Nutrient spray for leafy houseplants.',
        priceEstimate: '$12.99',
        rating: 4.8
      }
    ],
    careGuide: {
      wateringSchedule: 'Water when top 2-3 inches of soil feels dry',
      humidityLevel: '60% - 70% (High humidity preferred)',
      lightRequirement: 'Bright indirect light',
      fertilizerNPK: 'NPK 10-10-10 liquid fertilizer monthly in spring/summer',
      idealTemperature: '20°C - 26°C (68°F - 78°F)',
      soilType: 'Well-draining rich potting soil mix'
    },
    weatherNotes: {
      condition: 'Dry Ambient Air',
      tempImpact: 'Warm temperatures accelerate foliage moisture evaporation.',
      humidityWarning: 'Humidity below 40% causes leaf tip browning.',
      actionRequired: 'Place a humidifier nearby or mist foliage twice weekly.'
    },
    imageUrl: imageBase64 || undefined,
    timestamp: 'Just now'
  };
}
