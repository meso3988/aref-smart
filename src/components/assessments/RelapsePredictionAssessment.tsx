import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowRight, ArrowLeft, Loader2, Bot, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: string;
  text: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

interface RiskAnalysis {
  level: string;
  description: string;
  recommendations: string[];
  color: string;
}

const questions: Question[] = [
  {
    id: "q1",
    text: "هل تشعر بصعوبة في مقاومة الرغبة في العودة للتعاطي عند التفكير فيه؟",
    options: [
      { label: "نعم", value: "yes" },
      { label: "لا", value: "no" }
    ]
  },
  {
    id: "q2",
    text: "هل تجد نفسك تفكر في التعاطي كحل للتغلب على التوتر أو الضغوط اليومية؟",
    options: [
      { label: "نعم", value: "yes" },
      { label: "لا", value: "no" }
    ]
  },
  {
    id: "q3",
    text: "هل تعتقد أن لديك دوافع داخلية قوية للعودة للتعاطي رغم محاولاتك للإقلاع؟",
    options: [
      { label: "نعم", value: "yes" },
      { label: "لا", value: "no" }
    ]
  },
  {
    id: "q4",
    text: "هل تشعر بأنك غير قادر على التحكم برغباتك عند رؤية أشخاص أو أماكن مرتبطة بالتعاطي؟",
    options: [
      { label: "نعم", value: "yes" },
      { label: "لا", value: "no" }
    ]
  },
  {
    id: "q5",
    text: "هل تحس بأنك تميل للانسحاب من الأنشطة الاجتماعية الإيجابية بسبب رغبتك في التعاطي؟",
    options: [
      { label: "نعم", value: "yes" },
      { label: "لا", value: "no" }
    ]
  },
  {
    id: "q6",
    text: "هل سبق أن عدت للتعاطي بعد فترة انقطاع قصيرة لأنك شعرت باليأس أو الإحباط؟",
    options: [
      { label: "نعم", value: "yes" },
      { label: "لا", value: "no" }
    ]
  },
  {
    id: "q7",
    text: "هل تشعر أن الضغوط النفسية والحياتية تزيد من احتمالية عودتك للتعاطي؟",
    options: [
      { label: "نعم", value: "yes" },
      { label: "لا", value: "no" }
    ]
  },
  {
    id: "q8",
    text: "هل تشعر بصعوبة في استخدام استراتيجيات بديلة للسيطرة على الرغبة بالتعاطي؟",
    options: [
      { label: "نعم", value: "yes" },
      { label: "لا", value: "no" }
    ]
  },
  {
    id: "q9",
    text: "عند الشعور بالضيق العاطفي، هل تجد نفسك تميل للتفكير بالتعاطي كوسيلة للهروب؟",
    options: [
      { label: "نعم", value: "yes" },
      { label: "لا", value: "no" }
    ]
  },
  {
    id: "q10",
    text: "هل تعتقد أنك ستواجه صعوبة كبيرة في مقاومة الانتكاسة بدون دعم خارجي؟",
    options: [
      { label: "نعم", value: "yes" },
      { label: "لا", value: "no" }
    ]
  }
];

const riskLevels: Record<string, RiskAnalysis> = {
  low: {
    level: "خطر منخفض",
    description: "لديك قدرة جيدة على التحكم في رغباتك وإدارة المواقف الصعبة",
    recommendations: [
      "واصل اتباع الاستراتيجيات الإيجابية في التعامل مع الضغوط",
      "حافظ على روتينك اليومي الصحي",
      "استمر في المشاركة في الأنشطة الاجتماعية الداعمة"
    ],
    color: "green"
  },
  medium: {
    level: "خطر متوسط",
    description: "قد تحتاج إلى دعم إضافي للتعامل مع بعض التحديات",
    recommendations: [
      "تواصل مع مجموعات الدعم بشكل منتظم",
      "طور استراتيجيات جديدة لمقاومة الرغبات",
      "اطلب المساعدة عند الشعور بالضغط"
    ],
    color: "yellow"
  },
  high: {
    level: "خطر مرتفع",
    description: "أنت بحاجة إلى دعم مكثف للتعامل مع خطر الانتكاسة",
    recommendations: [
      "اطلب استشارة مختص في أقرب وقت",
      "شارك مخاوفك مع شبكة الدعم الخاصة بك",
      "راجع وعدل خطة التعافي الخاصة بك"
    ],
    color: "orange"
  },
  veryHigh: {
    level: "خطر مرتفع جداً",
    description: "أنت في وضع حرج يتطلب تدخلاً فورياً",
    recommendations: [
      "اطلب المساعدة المهنية فوراً",
      "تواصل مع خط المساعدة على مدار 24 ساعة",
      "لا تتردد في طلب الدعم العاجل من المختصين"
    ],
    color: "red"
  }
};

const RelapsePredictionAssessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setShowResults(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateRiskLevel = (): RiskAnalysis => {
    const yesCount = Object.values(answers).filter(answer => answer === 'yes').length;
    
    if (yesCount <= 2) return riskLevels.low;
    if (yesCount <= 5) return riskLevels.medium;
    if (yesCount <= 8) return riskLevels.high;
    return riskLevels.veryHigh;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = currentQuestion && answers[currentQuestion.id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (showResults) {
    const result = calculateRiskLevel();
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">نتيجة التقييم</h2>
          
          <div className={`p-4 rounded-lg mb-6 bg-${result.color}-100`}>
            <h3 className="text-xl font-semibold mb-2">{result.level}</h3>
            <p className="mb-4">{result.description}</p>
            <div className="space-y-2">
              <h4 className="font-semibold">التوصيات:</h4>
              <ul className="list-disc list-inside space-y-1">
                {result.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-6 h-6 text-blue-600" />
              <h4 className="font-semibold text-blue-800">تحليل عارف الذكي</h4>
            </div>
            <p className="text-blue-900 mb-3">
              {result.level === "خطر منخفض" && 
                "يبدو أنك تتمتع بقدرة جيدة على التحكم في رغباتك وإدارة المواقف الصعبة. استمر في تطبيق الاستراتيجيات الناجحة التي تتبعها، وحافظ على شبكة الدعم الاجتماعي القوية التي بنيتها."
              }
              {result.level === "خطر متوسط" && 
                "لديك بعض نقاط القوة في مواجهة التحديات، لكنك قد تحتاج إلى تعزيز مهاراتك في التعامل مع الضغوط. أقترح عليك التركيز على تطوير استراتيجيات إضافية للتكيف والتواصل بشكل أكبر مع مجموعات الدعم."
              }
              {result.level === "خطر مرتفع" && 
                "أرى أنك تمر بفترة صعبة تتطلب اهتماماً خاصاً. من المهم جداً ألا تواجه هذه التحديات وحدك. أنصحك بشدة بالتواصل مع مختص وتعزيز شبكة دعمك الاجتماعي."
              }
              {result.level === "خطر مرتفع جداً" && 
                "أنا قلق عليك وأرى أن وضعك يتطلب تدخلاً فورياً. لا تتردد في طلب المساعدة المهنية الآن. تذكر أن طلب المساعدة ليس علامة ضعف، بل هو خطوة شجاعة نحو التعافي."
              }
            </p>
            <div className="space-y-2 text-blue-800">
              <h5 className="font-semibold">توصيات إضافية من عارف:</h5>
              <ul className="list-disc list-inside space-y-1">
                {result.level === "خطر منخفض" && (
                  <>
                    <li>تابع تسجيل يومياتك وملاحظاتك حول التحديات التي تواجهها وكيف تتغلب عليها</li>
                    <li>شارك تجربتك مع الآخرين لتشجيعهم ودعمهم في رحلتهم</li>
                    <li>ضع خطة وقائية للتعامل مع أي تحديات مستقبلية محتملة</li>
                  </>
                )}
                {result.level === "خطر متوسط" && (
                  <>
                    <li>ابدأ في ممارسة تمارين التأمل والاسترخاء يومياً</li>
                    <li>حدد الأوقات والمواقف التي تشعر فيها بالضعف وضع خطة للتعامل معها</li>
                    <li>اجعل التواصل مع مجموعة الدعم جزءاً أساسياً من روتينك اليومي</li>
                  </>
                )}
                {result.level === "خطر مرتفع" && (
                  <>
                    <li>اتصل بمختص نفسي أو معالج متخصص في الإدمان في أقرب وقت</li>
                    <li>شارك مخاوفك وتحدياتك مع شخص تثق به من شبكة دعمك</li>
                    <li>قم بتحديث خطة التعافي الخاصة بك مع مختص</li>
                  </>
                )}
                {result.level === "خطر مرتفع جداً" && (
                  <>
                    <li>اتصل بخط المساعدة على مدار 24 ساعة الآن</li>
                    <li>تواصل مع مركز علاج متخصص للحصول على المساعدة الفورية</li>
                    <li>لا تبق وحيداً - ابق مع شخص تثق به حتى تحصل على المساعدة المهنية</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>هذا التقييم للمساعدة الأولية فقط. يُرجى استشارة مختص للحصول على تقييم شامل.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-4">مقياس توقعات الانتكاسة (RPS)</h1>
        <p className="text-gray-600">
          يقيّم هذا المقياس العوامل النفسية والسلوكية التي قد تزيد من خطر الانتكاسة
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <label
                  key={option.value}
                  className={`block p-4 rounded-lg border cursor-pointer transition-colors
                    ${answers[currentQuestion.id] === option.value
                      ? 'bg-blue-50 border-blue-500'
                      : 'hover:bg-gray-50 border-gray-200'
                    }`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option.value}
                    checked={answers[currentQuestion.id] === option.value}
                    onChange={() => handleAnswer(option.value)}
                    className="hidden"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center ${
                currentQuestionIndex === 0 ? 'invisible' : ''
              }`}
            >
              <ArrowLeft className="ml-2" />
              السابق
            </button>

            <div className="text-sm text-gray-500">
              {currentQuestionIndex + 1} من {questions.length}
            </div>

            <button
              onClick={handleNext}
              disabled={!isAnswered || isLoading}
              className={`flex items-center ${
                !isAnswered ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin ml-2" />
              ) : isLastQuestion ? (
                'عرض النتيجة'
              ) : (
                <>
                  التالي
                  <ArrowRight className="mr-2" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RelapsePredictionAssessment;