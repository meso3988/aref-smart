import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Brain, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "هل لاحظت زيادة في التفكير بالسلوك أو المادة التي تحاول الإقلاع عنها؟"
  },
  {
    id: 2,
    text: "هل أصبحت أكثر انزعاجاً أو توتراً مؤخراً بما يجعلك تفكر في العودة للتعاطي؟"
  },
  {
    id: 3,
    text: "هل بدأت تتجنب أماكن أو أشخاص كانوا يوفرون لك دعماً إيجابياً؟"
  },
  {
    id: 4,
    text: "هل قلّ التزامك بالأنشطة الصحية أو البدائل الإيجابية التي اعتمدت عليها سابقاً؟"
  },
  {
    id: 5,
    text: "هل تراودك أفكار سلبية حول قدرتك على الثبات دون انتكاسة؟"
  },
  {
    id: 6,
    text: "هل تجد نفسك تبحث عن أعذار للعودة للاستخدام السابق؟"
  },
  {
    id: 7,
    text: "هل توقفت عن ممارسة استراتيجيات المواجهة التي تعلمتها لدرء الانتكاسة؟"
  },
  {
    id: 8,
    text: "هل تشعر بالإحباط أو الملل من نمط الحياة الصحي الذي تتبعه؟"
  },
  {
    id: 9,
    text: "هل تشعر بأن الدعم المحيط بك أقل مما كان عليه، مما يزيد احتمالية الانتكاسة؟"
  },
  {
    id: 10,
    text: "هل تفكر في \"تجربة بسيطة\" لإشباع الفضول أو كاختبار لنفسك؟"
  }
];

const AwareAssessment = () => {
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [alias, setAlias] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleStart = () => {
    setShowIntroduction(false);
  };

  const handleAnswer = (answer: boolean) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const getAIAnalysis = (score: number) => {
    let analysis = {
      riskLevel: '',
      message: '',
      recommendations: [] as string[],
    };

    if (score <= 2) {
      analysis.riskLevel = 'منخفض';
      analysis.message = 'يبدو أنك تسير في الاتجاه الصحيح! استمر في تطبيق استراتيجيات الوقاية التي تتبعها.';
      analysis.recommendations = [
        'حافظ على روتينك اليومي الصحي',
        'استمر في حضور جلسات الدعم',
        'مارس التأمل والاسترخاء بشكل منتظم'
      ];
    } else if (score <= 5) {
      analysis.riskLevel = 'متوسط';
      analysis.message = 'هناك بعض المؤشرات التي تحتاج إلى انتباهك. من المهم تعزيز استراتيجيات الوقاية.';
      analysis.recommendations = [
        'قم بزيادة تواصلك مع مجموعة الدعم',
        'راجع خطة الوقاية من الانتكاسة',
        'ابحث عن أنشطة جديدة إيجابية',
        'فكر في استشارة مختص للمساعدة في تقوية استراتيجيات المواجهة'
      ];
    } else if (score <= 8) {
      analysis.riskLevel = 'مرتفع';
      analysis.message = 'أرى مؤشرات قوية تستدعي الانتباه والتدخل السريع. من المهم جداً التواصل مع مختص.';
      analysis.recommendations = [
        'تواصل مع مختص نفسي أو معالج إدمان في أقرب وقت',
        'أخبر شخصاً تثق به عن مشاعرك الحالية',
        'تجنب الأماكن والمواقف المحفزة',
        'قم بتفعيل خطة الطوارئ لمنع الانتكاسة',
        'زد من جلسات العلاج والدعم'
      ];
    } else {
      analysis.riskLevel = 'حرج';
      analysis.message = 'الوضع يحتاج إلى تدخل عاجل. من الضروري طلب المساعدة المهنية فوراً.';
      analysis.recommendations = [
        'اتصل بمعالجك أو المختص النفسي فوراً',
        'لا تتردد في طلب الدعم العاجل من خط المساعدة',
        'ابق برفقة شخص داعم حتى تحصل على المساعدة المهنية',
        'تجنب العزلة في هذه الفترة',
        'اطلب المساعدة من العائلة أو الأصدقاء الموثوقين'
      ];
    }

    return analysis;
  };

  if (showIntroduction) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          علامات التحذير المبكرة للانتكاسة (AWARE)
        </h2>

        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تم تطوير مفهوم "علامات التحذير المبكرة للانتكاسة (AWARE)" للمساعدة على رصد المؤشرات المبكرة 
            التي قد تسبق عودة الفرد للتعاطي أو السلوك الإدماني.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-yellow-700 mb-2">سيساعدك هذا التقييم في:</p>
            <ul className="list-disc list-inside text-yellow-600 space-y-1 mr-4">
              <li>التعرف على علامات التحذير المبكرة</li>
              <li>تقييم مستوى خطورة هذه العلامات</li>
              <li>الحصول على تحليل وتوصيات من عارف الذكي</li>
            </ul>
          </div>

          <div className="mt-8">
            <div className="mb-4">
              <label htmlFor="alias" className="block text-gray-700 mb-2">
                الاسم المستعار (اختياري):
              </label>
              <input
                type="text"
                id="alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="أدخل اسمًا مستعارًا"
              />
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
            >
              ابدأ التقييم
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (showResult) {
    const score = Object.values(answers).filter(answer => answer).length;
    const analysis = getAIAnalysis(score);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          تحليل عارف الذكي لنتائجك
        </h3>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">
              {alias ? `مرحباً ${alias}،` : 'مرحباً،'}
            </p>
            <p className="text-3xl font-bold text-yellow-600 mb-4">
              {score}/10
            </p>
            <p className="text-lg font-medium text-gray-700">
              مستوى الخطورة: <span className="text-yellow-600">{analysis.riskLevel}</span>
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-800 mb-4">{analysis.message}</p>
            
            <h4 className="font-bold text-gray-800 mb-3">توصيات عارف الذكي:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {analysis.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg mt-6">
            <p className="text-red-700 text-center">
              تذكر: هذا التقييم إرشادي فقط. في حال وجود مؤشرات خطر، يُنصح بشدة استشارة مختص في علاج الإدمان.
            </p>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setShowIntroduction(true);
                setCurrentQuestion(0);
                setAnswers({});
                setShowResult(false);
              }}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              بدء تقييم جديد
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
    >
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            السؤال {currentQuestion + 1} من {questions.length}
          </span>
          <div className="w-32 h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-yellow-500 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-6">
          {questions[currentQuestion].text}
        </h3>

        <div className="space-y-4">
          <button
            onClick={() => handleAnswer(true)}
            className="w-full p-4 text-right bg-white border-2 border-gray-200 rounded-lg hover:border-yellow-500 transition-colors duration-200"
          >
            نعم
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="w-full p-4 text-right bg-white border-2 border-gray-200 rounded-lg hover:border-yellow-500 transition-colors duration-200"
          >
            لا
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AwareAssessment;
