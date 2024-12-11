export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  emotion: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
  totalDuration: number;
  backgroundColor: string;
  backgroundTheme: string;
  soundTheme: string;
  holdAfterExhale: number;
}

export const breathingExercises: BreathingExercise[] = [
  {
    id: 'anxiety',
    name: 'تخفيف القلق',
    description: 'تقنية ٤-٧-٨ للتهدئة',
    emotion: 'anxiety',
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 10,
    totalDuration: 190,
    backgroundColor: '#E3F2FD',
    backgroundTheme: 'ocean',
    soundTheme: 'ocean',
    holdAfterExhale: 5
  },
  {
    id: 'anger',
    name: 'التحكم في الغضب',
    description: 'تقنية ٣-٦ للتهدئة',
    emotion: 'anger',
    inhale: 3,
    hold: 0,
    exhale: 6,
    cycles: 12,
    totalDuration: 108,
    backgroundColor: '#F3E5F5',
    backgroundTheme: 'waterfall',
    soundTheme: 'nature',
    holdAfterExhale: 5
  },
  {
    id: 'sadness',
    name: 'تخفيف الحزن',
    description: 'تقنية ٦-٢-٨ للتوازن العاطفي',
    emotion: 'sadness',
    inhale: 6,
    hold: 2,
    exhale: 8,
    cycles: 8,
    totalDuration: 128,
    backgroundColor: '#E8F5E9',
    backgroundTheme: 'mountains',
    soundTheme: 'piano',
    holdAfterExhale: 5
  },
  {
    id: 'energy',
    name: 'تنشيط الطاقة',
    description: 'تنفس سريع ٢-٢',
    emotion: 'energy',
    inhale: 2,
    hold: 0,
    exhale: 2,
    cycles: 20,
    totalDuration: 80,
    backgroundColor: '#FFF3E0',
    backgroundTheme: 'mountains',
    soundTheme: 'birds',
    holdAfterExhale: 5
  },
  {
    id: 'relax',
    name: 'الاسترخاء العميق',
    description: 'تقنية ٤-٤-٦ للاسترخاء',
    emotion: 'relax',
    inhale: 4,
    hold: 4,
    exhale: 6,
    cycles: 10,
    totalDuration: 140,
    backgroundColor: '#E0F7FA',
    backgroundTheme: 'night-sky',
    soundTheme: 'nature',
    holdAfterExhale: 5
  },
  {
    id: 'addiction',
    name: 'تقليل الرغبة في التعاطي',
    description: 'تقنية ٥-٥-١٠ للتحكم',
    emotion: 'addiction',
    inhale: 5,
    hold: 5,
    exhale: 10,
    cycles: 6,
    totalDuration: 120,
    backgroundColor: '#F3E5F5',
    backgroundTheme: 'waterfall',
    soundTheme: 'rain',
    holdAfterExhale: 5
  },
  {
    id: 'negative',
    name: 'تقليل الأفكار السلبية',
    description: 'تقنية ٤-٦-١٠ للتركيز',
    emotion: 'negative',
    inhale: 4,
    hold: 6,
    exhale: 10,
    cycles: 8,
    totalDuration: 160,
    backgroundColor: '#E8F5E9',
    backgroundTheme: 'night-sky',
    soundTheme: 'piano',
    holdAfterExhale: 5
  }
];

export const backgroundThemes = {
  'ocean': 'url(https://i.imgur.com/Hfpp1Dk.jpg)',
  'night-sky': 'url(https://i.imgur.com/a9ssUnG.jpg)', 
  'mountains': 'url(https://i.imgur.com/TR3537i.jpg)',
  'waterfall': 'url(https://i.imgur.com/avJ5Gxt.jpg)'
};

export const soundThemes = {
  ocean: new Audio('/sounds/ocean.mp3'),
  birds: new Audio('/sounds/birds.mp3'),
  rain: new Audio('/sounds/rain.mp3'),
  piano: new Audio('/sounds/piano.mp3'),
  nature: new Audio('/sounds/nature.mp3')
};