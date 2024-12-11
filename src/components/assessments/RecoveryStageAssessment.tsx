import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Target, Shield, Activity, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: Array<{
    label: string;
    value: number;
  }>;
}

interface StageAnalysis {
  stage: string;
  description: string;
  recommendations: string[];
  nextSteps: string[];
  color: string;
  Icon: typeof Brain | typeof Target | typeof Shield | typeof Activity;
}

const questions: Question[] = [
  // مرحلة الوعي والإقرار بالمشكلة
  {
    id: "q1",
    text: "هل تعترف بأن لديك مشكلة مع الإدمان؟",
    options: [
      { label: "لا", value: 1 },
      { label: "ربما", value: 2 },
      { label: "نعم", value: 3 }
    ]
  },
  {
    id: "q2",
    text: "هل تفكر في العواقب السلبية للإدمان على حياتك؟",
    options: [
      { label: "نادراً", value: 1 },
      { label: "أحياناً", value: 2 },
      { label: "دائماً", value: 3 }
    ]
  },
  // مرحلة التحضير والقبول
  {
    id: "q3",
    text: "هل تشعر بأنك مستعد لطلب المساعدة؟",
    options: [
      { label: "لا", value: 1 },
      { label: "أفكر في ذلك", value: 2 },
      { label: "نعم", value: 3 }
    ]
  },
  {
    id: "q4",
    text: "هل تسعى للحصول على معلومات حول العلاج أو التعافي؟",
    options: [
      { label: "لا أهتم حالياً", value: 1 },
      { label: "أبحث قليلاً", value: 2 },
      { label: "أبحث بجدية وأستعد للخطوات القادمة", value: 3 }
    ]
  },
  // مرحلة التخلص من السموم
  {
    id: "q5",
    text: "هل بدأت في التعامل مع الأعراض الجسدية للإدمان؟",
    options: [
      { label: "لم أبدأ بعد", value: 1 },
      { label: "بدأت قليلاً، لكنها صعبة", value: 2 },
      { label: "نعم، وأشعر بتحسن تدريجي", value: 3 }
    ]
  },
  {
    id: "q6",
    text: "هل لديك خطة للتعامل مع الأعراض الانسحابية؟",
    options: [
      { label: "لا خطة", value: 1 },
      { label: "خطة غير واضحة", value: 2 },
      { label: "خطة واضحة وتحت إشراف مختص", value: 3 }
    ]
  },
  // مرحلة التأهيل
  {
    id: "q7",
    text: "هل تعمل على فهم أسباب الإدمان النفسية والاجتماعية؟",
    options: [
      { label: "لم أبدأ بعد", value: 1 },
      { label: "بدأت في التفكير فيها", value: 2 },
      { label: "نعم، أعمل بجد على ذلك", value: 3 }
    ]
  },
  {
    id: "q8",
    text: "هل تتلقى دعماً نفسياً أو علاجاً جماعياً؟",
    options: [
      { label: "لا أشارك", value: 1 },
      { label: "أشارك أحياناً", value: 2 },
      { label: "أشارك بانتظام", value: 3 }
    ]
  },
  // مرحلة التعافي المبكر
  {
    id: "q9",
    text: "هل تشعر بأنك بدأت في بناء روتين حياة صحي؟",
    options: [
      { label: "لم أبدأ بعد", value: 1 },
      { label: "بدأت تدريجياً", value: 2 },
      { label: "نعم، لدي روتين يومي صحي", value: 3 }
    ]
  },
  {
    id: "q10",
    text: "هل تجد السعادة في الابتعاد عن الإدمان؟",
    options: [
      { label: "لا أشعر بذلك", value: 1 },
      { label: "أحياناً أشعر بها", value: 2 },
      { label: "نعم، أشعر بسعادة واضحة", value: 3 }
    ]
  },
  // مرحلة الوقاية من الانتكاسة
  {
    id: "q11",
    text: "هل لديك استراتيجيات واضحة لتجنب الانتكاسة؟",
    options: [
      { label: "لا توجد لدي أي استراتيجيات", value: 1 },
      { label: "لدي بعض الاستراتيجيات لكنها غير كافية", value: 2 },
      { label: "لدي خطة واضحة وأطبقها باستمرار", value: 3 }
    ]
  },
  {
    id: "q12",
    text: "هل تشعر بأنك مستعد لمواجهة المحفزات والتحديات؟",
    options: [
      { label: "غير مستعد", value: 1 },
      { label: "أحياناً مستعد", value: 2 },
      { label: "مستعد تماماً", value: 3 }
    ]
  }
];

const stages: Record<string, StageAnalysis> = {
  awareness: {
    stage: "مرحلة الوعي والإقرار بالمشكلة",
    description: "أنت في بداية رحلة التعافي، وتظهر علامات إيجابية في إدراك المشكلة والحاجة للتغيير",
    recommendations: [
      "ابحث عن معلومات موثوقة حول التعافي من مصادر معتمدة",
      "تحدث مع شخص تثق به عن مشاعرك وتحدياتك",
      "اكتب يومياً عن مشاعرك وتأثير الإدمان على حياتك",
      "فكر في الأسباب التي تدفعك للتغيير وسجلها"
    ],
    nextSteps: [
      "حدد موعداً للاستشارة الأولية مع مختص",
      "ابدأ في تسجيل أنماط السلوك المرتبطة بالإدمان",
      "تعرف على خيارات العلاج المتاحة في منطقتك",
      "ابدأ في بناء نظام دعم أولي من العائلة والأصدقاء الموثوقين"
    ],
    color: "bg-blue-500",
    Icon: Brain
  },
  preparation: {
    stage: "مرحلة التحضير والقبول",
    description: "أنت تتخذ خطوات إيجابية نحو التعافي وتظهر استعداداً جيداً للتغيير",
    recommendations: [
      "ضع خطة واضحة ومكتوبة للتعافي",
      "حدد الأشخاص الذين سيدعمونك في رحلتك",
      "تعرف على المحفزات الشخصية وكيفية تجنبها",
      "ابدأ في تعلم مهارات التأقلم الصحية"
    ],
    nextSteps: [
      "حدد موعداً لبدء برنامج علاجي منظم",
      "انضم إلى مجموعة دعم محلية أو عبر الإنترنت",
      "قم بإزالة المحفزات من محيطك",
      "أعد تنظيم جدولك اليومي لدعم التعافي"
    ],
    color: "bg-purple-500",
    Icon: Target
  },
  detox: {
    stage: "مرحلة التخلص من السموم",
    description: "أنت في مرحلة مهمة من التعامل مع الأعراض الجسدية والتكيف مع التغيير",
    recommendations: [
      "التزم بخطة العلاج الطبي بدقة",
      "حافظ على التواصل المنتظم مع الفريق الطبي",
      "اهتم بالتغذية الصحية والنوم الكافي",
      "مارس تمارين الاسترخاء والتأمل"
    ],
    nextSteps: [
      "تابع مع طبيبك بانتظام",
      "سجل الأعراض الجسدية والنفسية يومياً",
      "ابدأ في ممارسة نشاط بدني خفيف",
      "اطلب المساعدة فوراً عند الشعور بأعراض شديدة"
    ],
    color: "bg-yellow-500",
    Icon: Shield
  },
  rehabilitation: {
    stage: "مرحلة التأهيل",
    description: "أنت تعمل بنشاط على فهم وتغيير السلوكيات والأنماط النفسية",
    recommendations: [
      "شارك بفعالية في جلسات العلاج النفسي",
      "تعلم مهارات جديدة للتعامل مع الضغوط",
      "ابنِ علاقات صحية وداعمة",
      "استكشف هواياتك واهتماماتك الجديدة"
    ],
    nextSteps: [
      "حدد أهدافاً قصيرة المدى للتعافي",
      "طور مهارات التواصل الفعال",
      "شارك في أنشطة جماعية داعمة",
      "ابدأ في إصلاح العلاقات المتضررة"
    ],
    color: "bg-green-500",
    Icon: Activity
  },
  earlyRecovery: {
    stage: "مرحلة التعافي المبكر",
    description: "أنت تحقق تقدماً ملموساً وتبني أساساً قوياً للتعافي المستدام",
    recommendations: [
      "واصل الالتزام بروتينك اليومي الصحي",
      "طور مهارات إدارة الوقت والضغوط",
      "ابحث عن فرص للنمو الشخصي والمهني",
      "شارك تجربتك مع الآخرين بشكل بناء"
    ],
    nextSteps: [
      "ضع أهدافاً طويلة المدى لحياتك",
      "وسع شبكة دعمك الاجتماعي",
      "ابدأ في ممارسة هوايات جديدة",
      "خطط لمستقبلك المهني أو الدراسي"
    ],
    color: "bg-indigo-500",
    Icon: Target
  },
  relapsePrevention: {
    stage: "مرحلة الوقاية من الانتكاسة",
    description: "أنت تطور مهارات قوية للحفاظ على تعافيك والوقاية من الانتكاسة",
    recommendations: [
      "راجع وحدّث خطة الوقاية من الانتكاسة بانتظام",
      "تعرف على علامات الإنذار المبكر",
      "حافظ على التواصل مع نظام الدعم",
      "مارس تقنيات إدارة التوتر بانتظام"
    ],
    nextSteps: [
      "شارك في مجموعات الدعم المتقدمة",
      "كن مرشداً للآخرين في رحلة تعافيهم",
      "طور مهارات قيادية في مجتمع التعافي",
      "استمر في تطوير ذاتك وتحقيق أهدافك"
    ],
    color: "bg-red-500",
    Icon: Shield
  }
};

function RecoveryStageAssessment() {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [nickname, setNickname] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [currentStage, setCurrentStage] = useState<StageAnalysis | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(((Object.keys(answers).length) / questions.length) * 100);
  }, [answers]);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        analyzeResults();
      }
    }, 500);
  };

  const analyzeResults = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // حساب متوسط النقاط لكل مرحلة
      const awarenessScore = (answers['q1'] || 0) + (answers['q2'] || 0);
      const preparationScore = (answers['q3'] || 0) + (answers['q4'] || 0);
      const detoxScore = (answers['q5'] || 0) + (answers['q6'] || 0);
      const rehabilitationScore = (answers['q7'] || 0) + (answers['q8'] || 0);
      const earlyRecoveryScore = (answers['q9'] || 0) + (answers['q10'] || 0);
      const relapsePreventionScore = (answers['q11'] || 0) + (answers['q12'] || 0);

      // تحديد المرحلة الحالية بناءً على أعلى درجة
      const scores = {
        awareness: awarenessScore / 2,
        preparation: preparationScore / 2,
        detox: detoxScore / 2,
        rehabilitation: rehabilitationScore / 2,
        earlyRecovery: earlyRecoveryScore / 2,
        relapsePrevention: relapsePreventionScore / 2
      };

      const currentStageKey = Object.entries(scores).reduce((a, b) => {
        const [keyA, scoreA] = a;
        const [keyB, scoreB] = b;
        return scoreA > scoreB ? a : b;
      })[0][0];

      setCurrentStage(stages[currentStageKey]);
      setShowResult(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const renderNicknameScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">مرحباً بك في تقييم مراحل التعافي</h2>
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

      <h3 className="text-xl font-semibold mb-6 text-gray-800">{question.text}</h3>
      
      <div className="space-y-4">
        {question.options.map((option) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswerChange(question.id, option.value)}
            className="w-full p-4 text-right bg-gray-50 hover:bg-violet-50 rounded-lg border-2 border-gray-200 hover:border-violet-300 transition-all duration-300"
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      {index > 0 && (
        <button
          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          className="mt-6 text-gray-600 hover:text-violet-600 transition-colors duration-300 flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          السؤال السابق
        </button>
      )}
    </motion.div>
  );

  const renderAnalyzing = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="inline-block mb-4"
      >
        <Loader2 className="w-12 h-12 text-violet-600" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        يقوم عارف بتحليل إجاباتك...
      </h3>
      <p className="text-gray-600">
        لحظات وسأقدم لك تحليلاً شاملاً لمرحلة تعافيك
      </p>
    </motion.div>
  );

  const renderResult = () => {
    if (!currentStage) return null;
    const StageIcon = currentStage.Icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto mt-8"
      >
        <div className="text-center mb-8">
          {nickname && (
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl text-gray-700 mb-4"
            >
              مرحباً {nickname}
            </motion.h3>
          )}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`inline-flex items-center justify-center w-20 h-20 ${currentStage.color} rounded-full mb-6`}
          >
            <StageIcon className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            {currentStage.stage}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-lg mb-8"
          >
            {currentStage.description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-violet-600 mb-4">توصيات عارف الذكي</h3>
            <ul className="space-y-4">
              {currentStage.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3 space-x-reverse text-gray-700"
                >
                  <span className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{rec}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-violet-600 mb-4">الخطوات القادمة</h3>
            <ul className="space-y-4">
              {currentStage.nextSteps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3 space-x-reverse text-gray-700"
                >
                  <span className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{step}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => {
            setShowResult(false);
            setCurrentQuestionIndex(-1);
            setAnswers({});
          }}
          className="mt-12 w-full bg-violet-600 text-white py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors duration-300"
        >
          بدء تقييم جديد
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AnimatePresence mode="wait">
        {currentQuestionIndex === -1 && renderNicknameScreen()}
        {currentQuestionIndex >= 0 && !showResult && !isAnalyzing && 
          renderQuestion(questions[currentQuestionIndex], currentQuestionIndex)}
        {isAnalyzing && renderAnalyzing()}
        {showResult && renderResult()}
      </AnimatePresence>
    </div>
  );
}

export default RecoveryStageAssessment;
