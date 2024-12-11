import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Target, Shield, Activity, ArrowRight, ArrowLeft, Loader2, AlertTriangle, Heart, Stethoscope, Bot } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: Array<{
    label: string;
    value: number;
  }>;
}

interface AssessmentResult {
  level: string;
  description: string;
  recommendations: string[];
  nextSteps: string[];
  color: string;
  Icon: typeof Brain | typeof Target | typeof Shield | typeof Activity | typeof Heart | typeof Stethoscope;
}

const questions: Question[] = [
  {
    id: "q1",
    text: "هل استخدمت أي نوع من المخدرات؟",
    options: [
      { label: "لا", value: 0 },
      { label: "نعم", value: 1 }
    ]
  },
  {
    id: "q2",
    text: "هل أسأت استعمال الأدوية الموصوفة لك من قبل الطبيب؟",
    options: [
      { label: "لا", value: 0 },
      { label: "نعم", value: 1 }
    ]
  },
  {
    id: "q3",
    text: "هل تسببت المواد المخدرة في مشاكل في علاقاتك مع الآخرين؟",
    options: [
      { label: "لا", value: 0 },
      { label: "نعم", value: 1 }
    ]
  },
  {
    id: "q4",
    text: "هل تجاهلت التزاماتك الاجتماعية أو العملية بسبب التعاطي؟",
    options: [
      { label: "لا", value: 0 },
      { label: "نعم", value: 1 }
    ]
  },
  {
    id: "q5",
    text: "هل شعرت بحاجة لزيادة الجرعة للحصول على نفس التأثير؟",
    options: [
      { label: "لا", value: 0 },
      { label: "نعم", value: 1 }
    ]
  },
  {
    id: "q6",
    text: "هل عانيت من أعراض انسحابية عند تقليل أو إيقاف التعاطي؟",
    options: [
      { label: "لا", value: 0 },
      { label: "نعم", value: 1 }
    ]
  },
  {
    id: "q7",
    text: "هل واجهت مشاكل صحية أو نفسية بسبب تعاطيك للمخدرات؟",
    options: [
      { label: "لا", value: 0 },
      { label: "نعم", value: 1 }
    ]
  },
  {
    id: "q8",
    text: "هل واجهت مشاكل قانونية بسبب التعاطي؟",
    options: [
      { label: "لا", value: 0 },
      { label: "نعم", value: 1 }
    ]
  },
  {
    id: "q9",
    text: "هل حاولت الإقلاع وفشلت؟",
    options: [
      { label: "لا", value: 0 },
      { label: "نعم", value: 1 }
    ]
  },
  {
    id: "q10",
    text: "هل تشعر بالندم أو الذنب حيال تعاطيك للمخدرات؟",
    options: [
      { label: "لا", value: 0 },
      { label: "نعم", value: 1 }
    ]
  }
];

const assessmentLevels: Record<string, AssessmentResult> = {
  none: {
    level: "لا توجد مؤشرات واضحة",
    description: "لا تظهر مؤشرات واضحة على وجود مشكلة تعاطي. هذه نتيجة إيجابية، لكن من المهم الحفاظ على نمط حياة صحي.",
    recommendations: [
      "حافظ على نمط حياتك الصحي الحالي",
      "تعلم المزيد عن الوقاية من الإدمان",
      "كن داعماً للآخرين في محيطك",
      "شارك في أنشطة تعزز الصحة النفسية"
    ],
    nextSteps: [
      "استمر في ممارسة الرياضة والنشاطات الصحية",
      "حافظ على علاقاتك الاجتماعية الإيجابية",
      "شارك في برامج توعوية حول الإدمان",
      "كن قدوة إيجابية في مجتمعك"
    ],
    color: "green",
    Icon: Heart
  },
  mild: {
    level: "مستوى خفيف",
    description: "هناك بعض المؤشرات التي تستدعي الانتباه. من المهم التعامل مع الأمر بجدية في هذه المرحلة المبكرة.",
    recommendations: [
      "تحدث مع مختص نفسي أو مرشد",
      "تعرف على أنماط سلوكك وما يحفزها",
      "ابدأ في تطوير استراتيجيات للتعامل مع الضغوط",
      "راقب عاداتك وسلوكياتك بوعي"
    ],
    nextSteps: [
      "حدد موعداً للاستشارة المهنية",
      "ابدأ في تسجيل يومي لأنماط سلوكك",
      "تعلم تقنيات الاسترخاء والتأمل",
      "ابحث عن أنشطة بديلة إيجابية"
    ],
    color: "yellow",
    Icon: Shield
  },
  moderate: {
    level: "مستوى متوسط",
    description: "تشير النتائج إلى وجود مشكلة تستدعي التدخل المهني. من المهم اتخاذ خطوات جادة الآن.",
    recommendations: [
      "اطلب المساعدة المهنية بشكل عاجل",
      "شارك في مجموعات الدعم",
      "تعلم مهارات التأقلم الصحية",
      "ابدأ في بناء نظام دعم قوي"
    ],
    nextSteps: [
      "تواصل مع مركز علاج متخصص",
      "احضر جلسات العلاج النفسي بانتظام",
      "شارك في برنامج تأهيل منظم",
      "اعمل على تقوية علاقاتك العائلية"
    ],
    color: "orange",
    Icon: Target
  },
  severe: {
    level: "مستوى شديد",
    description: "تشير النتائج إلى وجود مشكلة خطيرة تتطلب تدخلاً علاجياً فورياً ومكثفاً.",
    recommendations: [
      "اطلب المساعدة الطبية العاجلة",
      "التزم ببرنامج علاجي شامل",
      "شارك في برنامج إعادة تأهيل مكثف",
      "ابنِ شبكة دعم قوية"
    ],
    nextSteps: [
      "توجه فوراً إلى مركز علاج متخصص",
      "ابدأ برنامج علاج داخلي إذا أمكن",
      "شارك في جلسات علاج مكثفة",
      "اتبع خطة علاجية متكاملة"
    ],
    color: "red",
    Icon: Stethoscope
  },
  verySevere: {
    level: "مستوى شديد جداً",
    description: "الوضع يتطلب تدخلاً طبياً ونفسياً فورياً. حياتك وصحتك في خطر ويجب اتخاذ إجراءات عاجلة.",
    recommendations: [
      "اطلب المساعدة الطبية الفورية",
      "ادخل برنامج علاج داخلي",
      "احصل على دعم طبي ونفسي مكثف",
      "اتبع خطة إنقاذ عاجلة"
    ],
    nextSteps: [
      "توجه فوراً إلى أقرب مركز طوارئ",
      "اتصل بخط المساعدة على مدار الساعة",
      "التزم ببرنامج علاجي شامل",
      "اطلب الدعم العائلي والمهني"
    ],
    color: "red",
    Icon: AlertTriangle
  }
};

const getResultStyle = (color: string) => {
  switch (color) {
    case 'red':
      return 'bg-red-50 border-red-200';
    case 'orange':
      return 'bg-orange-50 border-orange-200';
    case 'yellow':
      return 'bg-yellow-50 border-yellow-200';
    case 'green':
      return 'bg-green-50 border-green-200';
    case 'blue':
      return 'bg-blue-50 border-blue-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

function DASTAssessment() {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [nickname, setNickname] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // تحديث شريط التقدم
    const newProgress = ((Object.keys(answers).length + 1) / questions.length) * 100;
    setProgress(newProgress);

    // إذا كانت هذه آخر إجابة، قم بتحليل النتائج
    if (Object.keys(answers).length + 1 === questions.length) {
      analyzeResults();
    } else if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const analyzeResults = () => {
    setIsAnalyzing(true);
    const score = Object.values(answers).reduce((sum, value) => sum + value, 0);
    console.log("Total Score:", score); // للتأكد من حساب النتيجة

    let result: AssessmentResult;
    if (score === 0) {
      result = assessmentLevels.none;
    } else if (score <= 2) {
      result = assessmentLevels.mild;
    } else if (score <= 5) {
      result = assessmentLevels.moderate;
    } else if (score <= 8) {
      result = assessmentLevels.severe;
    } else {
      result = assessmentLevels.verySevere;
    }

    console.log("Result Level:", result.level); // للتأكد من تحديد المستوى

    setTimeout(() => {
      setCurrentResult(result);
      setShowResult(true);
      setIsAnalyzing(false);
    }, 1500);
  };

  const renderNicknameScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">مرحباً بك في اختبار فحص تعاطي المخدرات (DAST)</h2>
      <div className="mb-8">
        <label className="block text-gray-700 text-lg mb-4 text-center">
          قبل أن نبدأ، هل تود أن تخبرني ما الاسم الذي تفضل أن أناديك به؟
        </label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-violet-500 text-center text-lg"
          placeholder="اكتب اسمك المستعار هنا"
        />
      </div>
      <button
        onClick={() => setCurrentQuestionIndex(0)}
        className="w-full bg-violet-600 text-white py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors duration-300 text-lg flex items-center justify-center gap-2"
      >
        دعنا نبدأ <ArrowLeft className="w-5 h-5" />
      </button>
    </motion.div>
  );

  const renderQuestion = (question: Question, index: number) => (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white rounded-lg shadow-md p-8"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">السؤال {index + 1} من {questions.length}</span>
          <span className="text-sm text-gray-500">التقدم: {Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <motion.div
            className="bg-violet-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.text}</h3>

      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswerChange(question.id, option.value)}
            className="w-full p-4 text-right bg-white border-2 border-gray-200 rounded-lg hover:border-violet-500 focus:border-violet-500 transition-colors duration-300"
          >
            {option.label}
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderResult = () => {
    if (!currentResult) return null;

    const ResultIcon = currentResult.Icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto mt-8"
      >
        {/* رأس النتيجة */}
        <div className="text-center mb-8">
          <div className={`inline-block p-4 rounded-full ${getResultStyle(currentResult.color)} mb-4`}>
            {ResultIcon && <ResultIcon className="w-12 h-12 text-gray-800" />}
          </div>
          <h2 className="text-2xl font-bold mb-2">{currentResult.level}</h2>
          <p className="text-lg text-gray-700">{currentResult.description}</p>
        </div>

        {/* التوصيات */}
        <div className={`p-6 rounded-lg mb-6 border-2 ${getResultStyle(currentResult.color)}`}>
          <h3 className="text-xl font-semibold mb-4">التوصيات المقترحة:</h3>
          <ul className="space-y-3">
            {currentResult.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* الخطوات التالية */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-800">تحليل عارف الذكي</h3>
          </div>
          <div className="space-y-4">
            <p className="text-blue-900 text-lg leading-relaxed">
              {currentResult.level === "لا توجد مؤشرات واضحة" && 
                "يسعدني أن أرى نتائجك الإيجابية. حافظ على نمط حياتك الصحي واستمر في تطوير مهاراتك في التعامل مع الضغوط."
              }
              {currentResult.level === "مؤشرات خفيفة" && 
                "أرى أن لديك بعض التحديات البسيطة. لكن مع الدعم المناسب والتوجيه، يمكنك تجاوزها بنجاح. دعني أساعدك في وضع خطة للتعامل معها."
              }
              {currentResult.level === "مؤشرات متوسطة" && 
                "من خلال تحليلي لإجاباتك، أرى أنك تواجه تحديات تستحق الاهتمام. لكن تذكر أن هذه التحديات يمكن تجاوزها مع الدعم المناسب والإرادة القوية."
              }
              {currentResult.level === "مؤشرات شديدة" && 
                "أشعر بالقلق من شدة التحديات التي تواجهها. لكن ثق بي، مع المساعدة المهنية المناسبة والدعم المستمر، يمكنك تجاوز هذه المرحلة."
              }
              {currentResult.level === "مؤشرات شديدة جداً" && 
                "أرى أن وضعك يتطلب اهتماماً فورياً وعناية خاصة. دعني أساعدك في اتخاذ الخطوة الأولى نحو التعافي. أنت لست وحدك في هذه الرحلة."
              }
            </p>
            <div className="mt-6">
              <h4 className="font-semibold text-blue-800 mb-3">الخطوات التالية المقترحة:</h4>
              <ul className="space-y-3">
                {currentResult.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* أزرار التنقل */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => {
              setShowResult(false);
              setCurrentQuestionIndex(-1);
              setAnswers({});
              setProgress(0);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            بدء تقييم جديد
          </button>
        </div>
      </motion.div>
    );
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-violet-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">جاري تحليل إجاباتك...</p>
      </div>
    );
  }

  if (showResult && currentResult) {
    return renderResult();
  }

  if (currentQuestionIndex === -1) {
    return renderNicknameScreen();
  }

  if (currentQuestionIndex < questions.length) {
    return renderQuestion(questions[currentQuestionIndex], currentQuestionIndex);
  }

  return null;
}

export default DASTAssessment;
