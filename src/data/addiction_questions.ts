export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface GameSection {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  minScoreToPass: number;
}

export const addictionSections: GameSection[] = [
  {
    id: 1,
    title: 'المواد الأفيونية والمهدئات',
    description: 'أسئلة حول المواد الأفيونية والمهدئات وتأثيراتها',
    minScoreToPass: 20,
    questions: [
      {
        id: 1,
        text: 'ما هي إحدى المواد الأفيونية الأكثر شيوعاً والتي تستخدم لتخفيف الألم؟',
        options: [
          'المورفين',
          'الأسبرين',
          'الباراسيتامول'
        ],
        correctAnswer: 0,
        explanation: 'المورفين هو من المواد الأفيونية الشائعة المستخدمة طبياً لتخفيف الألم',
        points: 10
      },
      {
        id: 2,
        text: 'ما هو أحد الأعراض الانسحابية الشائعة للمواد الأفيونية؟',
        options: [
          'زيادة الشهية',
          'آلام في العضلات والمفاصل',
          'تحسن في الحالة المزاجية'
        ],
        correctAnswer: 1,
        explanation: 'آلام العضلات والمفاصل من الأعراض الانسحابية الشائعة للمواد الأفيونية',
        points: 10
      }
    ]
  },
  {
    id: 2,
    title: 'المنشطات والقنب',
    description: 'أسئلة حول المنشطات والقنب وتأثيراتها',
    minScoreToPass: 20,
    questions: [
      {
        id: 3,
        text: 'ما هي إحدى المواد المنشطة التي تؤثر على الجهاز العصبي المركزي؟',
        options: [
          'الكوكايين',
          'الحشيش',
          'النيكوتين'
        ],
        correctAnswer: 0,
        explanation: 'الكوكايين من المنشطات القوية التي تؤثر على الجهاز العصبي المركزي',
        points: 10
      },
      {
        id: 4,
        text: 'ما هي إحدى التأثيرات النفسية لاستخدام الحشيش؟',
        options: [
          'تحسن الذاكرة',
          'تغيرات في الإدراك والحواس',
          'زيادة التركيز'
        ],
        correctAnswer: 1,
        explanation: 'يسبب الحشيش تغيرات في الإدراك والحواس',
        points: 10
      }
    ]
  },
  {
    id: 3,
    title: 'المواد المهلوسة والمستنشقة',
    description: 'أسئلة حول المواد المهلوسة والمستنشقة وتأثيراتها',
    minScoreToPass: 20,
    questions: [
      {
        id: 5,
        text: 'ما هي إحدى المواد المعروفة بتسببها في الهلوسة؟',
        options: [
          'إل إس دي (LSD)',
          'الكافيين',
          'الأسبرين'
        ],
        correctAnswer: 0,
        explanation: 'إل إس دي من المواد المهلوسة القوية',
        points: 10
      },
      {
        id: 6,
        text: 'ما هو أحد الأعراض الجسدية لاستخدام المواد المستنشقة؟',
        options: [
          'دوار وصداع',
          'زيادة التركيز',
          'نشاط بدني زائد'
        ],
        correctAnswer: 0,
        explanation: 'الدوار والصداع من الأعراض الشائعة لاستخدام المواد المستنشقة',
        points: 10
      }
    ]
  },
  {
    id: 4,
    title: 'العلاج والتعافي',
    description: 'أسئلة حول علاج الإدمان والتعافي',
    minScoreToPass: 20,
    questions: [
      {
        id: 7,
        text: 'ما هو الإجراء الأول الذي يجب اتخاذه عند الشك بإدمان شخص ما؟',
        options: [
          'تجاهل الأمر',
          'تقديم الدعم والتوجيه لطلب المساعدة المتخصصة',
          'معاقبته بشدة'
        ],
        correctAnswer: 1,
        explanation: 'تقديم الدعم والتوجيه للحصول على المساعدة المتخصصة هو الخطوة الأولى والأهم',
        points: 10
      },
      {
        id: 8,
        text: 'ما هو أحد العناصر الأساسية في علاج الإدمان؟',
        options: [
          'العلاج الدوائي فقط',
          'العلاج الشامل الذي يشمل الدوائي والنفسي والاجتماعي',
          'الانعزال التام دون علاج'
        ],
        correctAnswer: 1,
        explanation: 'العلاج الشامل الذي يتضمن الجوانب الدوائية والنفسية والاجتماعية هو الأكثر فعالية',
        points: 10
      }
    ]
  }
];
