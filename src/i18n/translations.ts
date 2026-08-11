export type Language = 'en' | 'ru' | 'kk';

export interface TranslationDict {
  // Header & Status
  engineActive: string;
  liveCamera: string;
  resetChat: string;

  // Sidebar
  brandSubtitle: string;
  newChat: string;
  searchPlaceholder: string;
  history: string;
  starred: string;
  noStarred: string;
  noHistory: string;
  settingsTitle: string;
  account: string;
  dailyScans: string;
  latency: string;

  // Greeting
  badgeVision: string;
  greetingTitleStart: string;
  greetingTitleHighlight: string;
  greetingSubtitle: string;
  quickScenarios: string;

  // Chat Input
  inputPlaceholder: string;
  uploadImage: string;
  voiceInput: string;
  send: string;
  analyzing: string;
  dragDropTitle: string;
  dragDropSub: string;
  imageReady: string;
  visionActive: string;
  dragHint: string;

  // Loading
  scannerActive: string;
  loadingStep1: string;
  loadingStep2: string;
  loadingStep3: string;
  loadingStep4: string;

  // Analysis Result Card
  severityLabel: string;
  confidenceLabel: string;
  diagnosisLabel: string;
  symptomsHeader: string;
  tabTreatment: string;
  tabCare: string;
  tabProducts: string;
  tabWeather: string;
  treatmentCheckHint: string;
  preventionTitle: string;
  
  // Care Schedule
  careWatering: string;
  careHumidity: string;
  careLight: string;
  careFertilizer: string;
  careTemp: string;
  careSoil: string;

  // Products & Weather
  viewProduct: string;
  weatherTitle: string;
  weatherCondition: string;
  weatherTempImpact: string;
  weatherHumidityAlert: string;
  weatherActionRequired: string;
  askFollowUp: string;
  setReminder: string;

  // Modals
  cameraTitle: string;
  cameraFocus: string;
  retake: string;
  usePhoto: string;

  voiceTitle: string;
  voiceListening: string;
  voiceIdle: string;
  voiceInsert: string;

  modelsTitle: string;
  modelsSubtitle: string;

  settingsHeader: string;
  tempUnitLabel: string;
  autoSaveLabel: string;
  autoSaveDesc: string;
  cameraResLabel: string;
  languageLabel: string;
  languageDesc: string;
  savePrefs: string;

  // Presets
  presets: {
    label: string;
    icon: string;
    text: string;
  }[];
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  en: {
    engineActive: 'AgroAI Neural Engine Active',
    liveCamera: 'Live Camera',
    resetChat: 'Start Fresh',

    brandSubtitle: 'Plant Health Engine',
    newChat: 'New Plant Analysis',
    searchPlaceholder: 'Search history...',
    history: 'History',
    starred: 'Starred',
    noStarred: 'No starred diagnoses yet',
    noHistory: 'No analysis history found',
    settingsTitle: 'Settings & Preferences',
    account: 'Botanist Account',
    dailyScans: '28 / 50 Daily Scans',
    latency: 'latency',

    badgeVision: 'AgroAI Multimodal Botanical Vision 3.6',
    greetingTitleStart: 'How can I help your ',
    greetingTitleHighlight: 'plants today?',
    greetingSubtitle: 'Upload a leaf photo or describe symptoms to receive instant disease diagnosis, treatment plans, products, and watering guides.',
    quickScenarios: 'Quick Agronomy Scenarios',

    inputPlaceholder: 'Describe the problem or upload a plant photo...',
    uploadImage: 'Upload Image',
    voiceInput: 'Voice Input',
    send: 'Send',
    analyzing: 'Analyzing...',
    dragDropTitle: 'Drop your plant photo here',
    dragDropSub: 'AgroAI will analyze symptoms immediately',
    imageReady: 'Plant Image Ready',
    visionActive: 'Multimodal vision feature active',
    dragHint: 'Drag & drop plant photos directly anywhere onto the screen',

    scannerActive: 'AgroAI Neural Scanner Active',
    loadingStep1: 'Extracting cellular leaf matrix & leaf morphology...',
    loadingStep2: 'Cross-referencing 20,000+ fungal & pest pathogen signatures...',
    loadingStep3: 'Calculating disease confidence & severity parameters...',
    loadingStep4: 'Synthesizing organic treatment plan & care guidelines...',

    severityLabel: 'Severity',
    confidenceLabel: 'Confidence',
    diagnosisLabel: 'Diagnosis:',
    symptomsHeader: 'Detected Physical Symptoms:',
    tabTreatment: 'Treatment Plan',
    tabCare: 'Care Schedule',
    tabProducts: 'Recommended Products',
    tabWeather: 'Weather Notes',
    treatmentCheckHint: 'Check off completed steps to track your plant recovery progress:',
    preventionTitle: 'Long-term Prevention & Proactivity:',

    careWatering: 'Watering',
    careHumidity: 'Humidity',
    careLight: 'Light Level',
    careFertilizer: 'Fertilizer NPK',
    careTemp: 'Ideal Temp',
    careSoil: 'Soil Mix',

    viewProduct: 'View Product',
    weatherTitle: 'Current Agronomic Climate Assessment',
    weatherCondition: 'Climate Condition:',
    weatherTempImpact: 'Temperature Impact:',
    weatherHumidityAlert: 'Humidity Alert:',
    weatherActionRequired: 'Action Required:',
    askFollowUp: 'Ask Follow-up Question',
    setReminder: 'Set Care Reminder',

    cameraTitle: 'Live Plant Camera Scan',
    cameraFocus: 'Center leaf or plant symptom in frame',
    retake: 'Retake',
    usePhoto: 'Use Photo',

    voiceTitle: 'AgroAI Voice Dictation',
    voiceListening: 'Listening for plant symptoms...',
    voiceIdle: 'Tap microphone to speak',
    voiceInsert: 'Insert into Chat',

    modelsTitle: 'Select AgroAI Engine Model',
    modelsSubtitle: 'Choose neural architecture for plant health scans',

    settingsHeader: 'AgroAI Preferences',
    tempUnitLabel: 'Temperature Unit',
    autoSaveLabel: 'Auto-Save Scans',
    autoSaveDesc: 'Automatically record diagnoses in left sidebar history',
    cameraResLabel: 'Camera Resolution',
    languageLabel: 'Language / Язык / Тіл',
    languageDesc: 'Agronomy terminology & diagnostic reports',
    savePrefs: 'Save Preferences',

    presets: [
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
    ],
  },
  ru: {
    engineActive: 'Нейросеть AgroAI активна',
    liveCamera: 'Камера',
    resetChat: 'Новый чат',

    brandSubtitle: 'Диагностика здоровья растений',
    newChat: 'Новый анализ растения',
    searchPlaceholder: 'Поиск в истории...',
    history: 'История',
    starred: 'Избранное',
    noStarred: 'Избранных анализов пока нет',
    noHistory: 'История анализов пуста',
    settingsTitle: 'Настройки и параметры',
    account: 'Аккаунт агронома',
    dailyScans: '28 / 50 сканирований в день',
    latency: 'задержка',

    badgeVision: 'AgroAI Ботаническое зрение 3.6',
    greetingTitleStart: 'Чем помочь вашим ',
    greetingTitleHighlight: 'растениям сегодня?',
    greetingSubtitle: 'Загрузите фото листа или опишите симптомы, чтобы получить точный диагноз, план лечения, подбор средств и режим полива.',
    quickScenarios: 'Быстрые агрономические сценарии',

    inputPlaceholder: 'Опишите проблему или загрузите фото растения...',
    uploadImage: 'Загрузить фото',
    voiceInput: 'Голосовой ввод',
    send: 'Отправить',
    analyzing: 'Анализируем...',
    dragDropTitle: 'Перетащите фото растения сюда',
    dragDropSub: 'AgroAI мгновенно распознает болезни и вредителей',
    imageReady: 'Изображение готово',
    visionActive: 'Режим распознавания фото активен',
    dragHint: 'Перетащите изображение растения в любую точку экрана',

    scannerActive: 'Сканер AgroAI анализирует фото',
    loadingStep1: 'Извлечение клеточной матрицы и морфологии листа...',
    loadingStep2: 'Сверка с базой 20,000+ грибковых и бактериальных патогенов...',
    loadingStep3: 'Расчет вероятности и степени поражения...',
    loadingStep4: 'Составление органик-плана лечения и рекомендаций...',

    severityLabel: 'Опасность',
    confidenceLabel: 'Точность',
    diagnosisLabel: 'Диагноз:',
    symptomsHeader: 'Обнаруженные симптомы:',
    tabTreatment: 'План лечения',
    tabCare: 'Режим ухода',
    tabProducts: 'Рекомендуемые средства',
    tabWeather: 'Погода и климат',
    treatmentCheckHint: 'Отмечайте выполненные шаги для отслеживания восстановления:',
    preventionTitle: 'Долгосрочная профилактика:',

    careWatering: 'Полив',
    careHumidity: 'Влажность',
    careLight: 'Освещение',
    careFertilizer: 'Удобрения NPK',
    careTemp: 'Температура',
    careSoil: 'Грунт',

    viewProduct: 'Открыть средство',
    weatherTitle: 'Агроклиматический анализ окружающей среды',
    weatherCondition: 'Состояние климата:',
    weatherTempImpact: 'Влияние температуры:',
    weatherHumidityAlert: 'Предупреждение о влажности:',
    weatherActionRequired: 'Необходимые действия:',
    askFollowUp: 'Задать уточняющий вопрос',
    setReminder: 'Создать напоминание ухода',

    cameraTitle: 'Сканирование с камеры',
    cameraFocus: 'Поместите пораженный лист в рамку',
    retake: 'Переснять',
    usePhoto: 'Использовать фото',

    voiceTitle: 'Голосовой ввод AgroAI',
    voiceListening: 'Слушаем описание симптомов...',
    voiceIdle: 'Нажмите на микрофон и говорите',
    voiceInsert: 'Вставить в чат',

    modelsTitle: 'Выбор модели нейросети AgroAI',
    modelsSubtitle: 'Выберите модель для сканирования и анализа растений',

    settingsHeader: 'Настройки AgroAI',
    tempUnitLabel: 'Единица температуры',
    autoSaveLabel: 'Автосохранение анализов',
    autoSaveDesc: 'Сохранять результаты в историю на боковой панели',
    cameraResLabel: 'Разрешение камеры',
    languageLabel: 'Язык интерфейса / Language / Тіл',
    languageDesc: 'Язык отчетов и терминологии',
    savePrefs: 'Сохранить настройки',

    presets: [
      {
        label: 'Желтеют листья у Монстеры',
        icon: '🍃',
        text: 'Листья Монстеры Делициоза желтеют с сухими коричневыми краями. В чем причина и как это вылечить?',
      },
      {
        label: 'Ранняя пятнистость томатов',
        icon: '🍅',
        text: 'На нижних листьях томатов появились темные концентрические пятна с желтым ореолом. Это альтернариоз?',
      },
      {
        label: 'Перелив и гниль суккулента',
        icon: '🪴',
        text: 'Стебли эхеверии стали мягкими и водянистыми. Как спасти растение от корневой гнили?',
      },
      {
        label: 'Цветение орхидеи и NPK',
        icon: '🌸',
        text: 'Какой график удобрений и уровень освещения нужен орхидее фаленопсис для повторного цветения?',
      },
    ],
  },
  kk: {
    engineActive: 'AgroAI Нейрожелісі Белсенді',
    liveCamera: 'Камера',
    resetChat: 'Жаңа чат',

    brandSubtitle: 'Өсімдік саулығын диагностикалау',
    newChat: 'Жаңа өсімдік анализі',
    searchPlaceholder: 'Тарихты іздеу...',
    history: 'Тарих',
    starred: 'Тандаулылар',
    noStarred: 'Тандаулы талдаулар әлі жоқ',
    noHistory: 'Анализ тарихы бос',
    settingsTitle: 'Баптаулар мен параметрлер',
    account: 'Агроном аккаунты',
    dailyScans: '28 / 50 күнделікті сканерлеу',
    latency: 'жылдамдық',

    badgeVision: 'AgroAI Ботаникалық көру 3.6',
    greetingTitleStart: 'Бүгін өсімдіктеріңізге ',
    greetingTitleHighlight: 'қалай көмектесе алам?',
    greetingSubtitle: 'Нақты диагноз, емдеу жоспарын, тыңайтқыштарды және суару кестесін алу үшін жапырақ фотосын жүктеңіз немесе белгілерді сипаттаңыз.',
    quickScenarios: 'Жылдам агрономиялық сценарийлер',

    inputPlaceholder: 'Мәселені сипаттаңыз немесе өсімдік фотосын жүктеңіз...',
    uploadImage: 'Сурет жүктеу',
    voiceInput: 'Дауыспен енгізу',
    send: 'Жіберу',
    analyzing: 'Талдануда...',
    dragDropTitle: 'Өсімдік фотосын осы жерге тастаңыз',
    dragDropSub: 'AgroAI аурулар мен зиянкестерді бірден анықтайды',
    imageReady: 'Сурет дайын',
    visionActive: 'Мультимодальды көру режимі белсенді',
    dragHint: 'Өсімдік суретін экранның кез келген жеріне сүйреп апарыңыз',

    scannerActive: 'AgroAI Сканері жұмыс істеп тұр',
    loadingStep1: 'Жапырақ жасушалары мен морфологиясын талдау...',
    loadingStep2: '20,000+ саңырауқұлақ пен зиянкес бактерияларымен салыстыру...',
    loadingStep3: 'Ауру қауіптілігі мен дәлдігін есептеу...',
    loadingStep4: 'Органикалық емдеу жоспары мен күтім ережелерін жасау...',

    severityLabel: 'Қауіптілік',
    confidenceLabel: 'Дәлдігі',
    diagnosisLabel: 'Диагноз:',
    symptomsHeader: 'Анықталған белгілер:',
    tabTreatment: 'Емдеу жоспары',
    tabCare: 'Күтім кестесі',
    tabProducts: 'Ұсынылатын өнімдер',
    tabWeather: 'Ауа райы мен климат',
    treatmentCheckHint: 'Өсімдіктің сауығу барысын бақылау үшін орындалған қадамдарды белгілеңіз:',
    preventionTitle: 'Ұзақ мерзімді алдын алу:',

    careWatering: 'Суару',
    careHumidity: 'Ылғалдылық',
    careLight: 'Жарық деңгейі',
    careFertilizer: 'Тыңайтқыш NPK',
    careTemp: 'Температура',
    careSoil: 'Топырақ құрамы',

    viewProduct: 'Өнімді қарау',
    weatherTitle: 'Агроклиматтық қоршаған ортаны бағалау',
    weatherCondition: 'Климат жағдайы:',
    weatherTempImpact: 'Температура әсері:',
    weatherHumidityAlert: 'Ылғалдылық ескертуі:',
    weatherActionRequired: 'Қажетті әрекеттер:',
    askFollowUp: 'Қосымша сұрақ қою',
    setReminder: 'Күтім ескертуін орнату',

    cameraTitle: 'Камерадан сканерлеу',
    cameraFocus: 'Зақымдалған жапырақты жақтауға орналастырыңыз',
    retake: 'Кайта түсіру',
    usePhoto: 'Суретті пайдалану',

    voiceTitle: 'AgroAI Дауыстық енгізу',
    voiceListening: 'Белгілер сипаттамасын тыңдаудамыз...',
    voiceIdle: 'Микрофонды басып сөйлеңіз',
    voiceInsert: 'Чатқа қосу',

    modelsTitle: 'AgroAI Нейрожелі моделін таңдау',
    modelsSubtitle: 'Өсімдіктерді сканерлеуге арналған нейрожелі архитектурасын таңдаңыз',

    settingsHeader: 'AgroAI Баптаулары',
    tempUnitLabel: 'Температура бірлігі',
    autoSaveLabel: 'Анализді автоматты сақтау',
    autoSaveDesc: 'Нәтижелерді сол жақ панельдегі тарихқа сақтау',
    cameraResLabel: 'Камера сапасы',
    languageLabel: 'Интерфейс тілі / Language / Язык',
    languageDesc: 'Есептер мен терминология тілі',
    savePrefs: 'Баптауларды сақтау',

    presets: [
      {
        label: 'Монстера жапырақтары сарғаюы',
        icon: '🍃',
        text: 'Монстера Делициоза жапырақтары жиектері қоңыр тартып сарғаюда. Емі қандай?',
      },
      {
        label: 'Қызанақ ақ дақ ауруы',
        icon: '🍅',
        text: 'Қызанақтың төменгі жапырақтарында сары жиекті қоңыр дақтар пайда болды. Бұл альтернариоз ба?',
      },
      {
        label: 'Суккулент шіруі мен су толуы',
        icon: '🪴',
        text: 'Эхеверия сабақтары жұмсарып кетті. Тамыр шіруінен өсімдікті қалай құтқаруға болады?',
      },
      {
        label: 'Орхидея гүлдеуі және NPK',
        icon: '🌸',
        text: 'Фаленопсис орхидеясы қайта гүлдеуі үшін қандай тыңайтқыш кестесі мен жарық керек?',
      },
    ],
  },
};
