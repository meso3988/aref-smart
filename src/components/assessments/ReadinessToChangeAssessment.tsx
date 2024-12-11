import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  category: 'precontemplation' | 'contemplation' | 'action';
}

const questions: Question[] = [
  {
    id: 1,
    text: "لا أعتقد أن لدي أي مشكلة تحتاج إلى تغيير.",
    category: 'precontemplation'
  },
  {
    id: 2,
    text: "أنا مستمتع بسلوكي الحالي ولا أرغب في تغييره.",
    category: 'precontemplation'
  },
  {
    id: 3,
    text: "أرى أنه مضيعة للوقت التفكير في تغيير سلوكي.",
    category: 'precontemplation'
  },
  {
    id: 4,
    text: "أنا سعيد بالطريقة التي أتصرف بها حالياً ولا أرى حاجة للتغيير.",
    category: 'precontemplation'
  },
  {
    id: 5,
    text: "أحياناً أفكر أنه ينبغي لي الحد من هذا السلوك.",
    category: 'contemplation'
  },
  {
    id: 6,
    text: "أدرك أن لدي مشكلة وأعتقد أنه يجب علي العمل عليها.",
    category: 'contemplation'
  },
  {
    id: 7,
    text: "أفكر في أنه قد يكون من الجيد تغيير شيء ما بخصوص سلوكي.",
    category: 'contemplation'
  },
  {
    id: 8,
    text: "أفكر في التغيير منذ مدة.",
    category: 'contemplation'
  },
  {
    id: 9,
    text: "لقد غيرت سلوكي للتو في الفترة الأخيرة.",
    category: 'action'
  },
  {
    id: 10,
    text: "أنا أعمل حالياً على تغيير سلوكي.",
    category: 'action'
  },
  {
    id: 11,
    text: "أقوم حالياً ببعض الخطوات العملية لتغيير سلوكي.",
    category: 'action'
  },
  {
    id: 12,
    text: "لقد تغير سلوكي بالفعل وأبحث عن طرق للحفاظ على هذا التغيير.",
    category: 'action'
  }
];

const ReadinessToChangeAssessment: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [alias, setAlias] = useState('');

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentQuestionIndex]: value });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    const scores = {
      precontemplation: 0,
      contemplation: 0,
      action: 0
    };

    questions.forEach((question, index) => {
      if (answers[index]) {
        scores[question.category] += answers[index];
      }
    });

    return scores;
  };

  const getAIAnalysis = (scores: { precontemplation: number; contemplation: number; action: number }) => {
    const stage = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    
    const analyses = {
      precontemplation: {
        title: "مرحلة ما قبل التأمل",
        analysis: "أنت حالياً في مرحلة ما قبل التأمل، حيث لا ترى حاجة ملحة للتغيير. هذا أمر طبيعي في بداية رحلة التعافي.",
        recommendations: [
          "خذ وقتك للتفكير في تأثير سلوكك الحالي على حياتك وعلى من حولك",
          "اقرأ المزيد عن تجارب الآخرين في التعافي",
          "تحدث مع شخص تثق به عن مخاوفك وأفكارك",
          "حاول تدوين الإيجابيات والسلبيات في سلوكك الحالي"
        ]
      },
      contemplation: {
        title: "مرحلة التأمل",
        analysis: "أنت في مرحلة التأمل، حيث بدأت تفكر جدياً في التغيير. هذه خطوة إيجابية نحو التعافي.",
        recommendations: [
          "ابدأ بوضع خطة أولية للتغيير",
          "حدد الأسباب التي تدفعك للتغيير واكتبها",
          "ابحث عن مجموعات دعم أو معالج متخصص",
          "تعرف على الموارد المتاحة للمساعدة في رحلة التعافي"
        ]
      },
      action: {
        title: "مرحلة العمل",
        analysis: "أنت في مرحلة العمل الفعال نحو التغيير. هذا يدل على التزامك وجديتك في التعافي.",
        recommendations: [
          "واصل العمل على خطة التعافي الخاصة بك",
          "احتفل بكل إنجاز صغير في رحلتك",
          "ابق على تواصل مع نظام الدعم الخاص بك",
          "كن مستعداً للتعامل مع التحديات بإيجابية"
        ]
      }
    };

    return analyses[stage as keyof typeof analyses];
  };

  if (showResults) {
    const scores = calculateResults();
    const analysis = getAIAnalysis(scores);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">تحليل عارف الذكي لنتائجك</h2>
          {alias && <p className="text-lg text-gray-600 mb-2">مرحباً {alias}</p>}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-emerald-700 mb-4">{analysis.title}</h3>
          <p className="text-gray-700 mb-6">{analysis.analysis}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-emerald-700 mb-4">توصيات عارف لك:</h3>
          <ul className="space-y-3">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">نتائجك التفصيلية:</h3>
          <div className="space-y-2">
            <p>مرحلة ما قبل التأمل: {scores.precontemplation} نقطة</p>
            <p>مرحلة التأمل: {scores.contemplation} نقطة</p>
            <p>مرحلة العمل: {scores.action} نقطة</p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">تذكر أن هذا التحليل هو مجرد دليل إرشادي. يُنصح دائماً باستشارة مختص للحصول على تقييم شامل.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {currentQuestionIndex === 0 && (
        <>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">مقياس الاستعداد للتغيير (RCQ)</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 text-right">
              <p>
                مرحباً بك في مقياس الاستعداد للتغيير (Readiness to Change Questionnaire - RCQ). تم تطوير هذا المقياس بالاعتماد على نموذج المراحل المتعددة للتغيير الذي وضعه الباحثان بروتشاسكا وديكليمنتي. يساعد هذا النموذج في فهم المرحلة التي يمر بها الفرد عند التفكير في تغيير سلوك معين، سواءً كان ذلك في مجال الإدمان، أو التدخين، أو اتباع نظام غذائي صحي، أو أي عادة أخرى يسعى الشخص إلى تعديلها.
              </p>
              
              <p>
                من خلال الإجابة على مجموعة من العبارات، سيمنحك هذا التقييم لمحة عن مدى استعدادك النفسي والعقلي للبدء في إحداث تغيير إيجابي في حياتك. وعلى الرغم من أن نتائج هذا المقياس ليست تشخيصاً نهائياً، فإنها يمكن أن تساعد في توجيهك نحو الخطوات التالية، سواءً بالتفكير بعمق في الحاجة إلى التغيير، أو الشروع في اتخاذ إجراءات عملية، أو تعزيز ما بدأت بتحقيقه بالفعل.
              </p>
              
              <p>
                يُفضّل، بعد الاطلاع على نتائج التقييم، استشارة مختص أو مرشد في المجال الذي ترغب في تغييره، لا سيما إذا احتجت إلى دعم إضافي أو توجيهات مخصصة لحالتك. نتمنى لك تجربة مفيدة ونتائج تعينك على المضي قدماً نحو التغيير الذي تنشده.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              الاسم المستعار (اختياري):
            </label>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="أدخل اسماً مستعاراً"
            />
          </div>
        </>
      )}
      
      {currentQuestionIndex > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">السؤال {currentQuestionIndex} من {questions.length}</h2>
            <p className="text-gray-600">{questions[currentQuestionIndex - 1].text}</p>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={value}
                  checked={answers[currentQuestionIndex - 1] === value}
                  onChange={() => handleAnswer(value)}
                  className="form-radio h-4 w-4 text-emerald-600"
                />
                <span className="mr-2 text-gray-700">
                  {value === 1 && "أعارض بشدة"}
                  {value === 2 && "أعارض"}
                  {value === 3 && "لست متأكداً"}
                  {value === 4 && "أوافق"}
                  {value === 5 && "أوافق بشدة"}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center px-4 py-2 rounded ${
                currentQuestionIndex === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              السابق
            </button>

            <button
              onClick={goToNextQuestion}
              disabled={!answers[currentQuestionIndex - 1]}
              className={`flex items-center px-4 py-2 rounded ${
                !answers[currentQuestionIndex - 1]
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {currentQuestionIndex === questions.length ? 'عرض النتائج' : 'التالي'}
              <ArrowRight className="w-4 h-4 mr-2" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-500">
        <AlertTriangle className="inline-block w-4 h-4 mr-1" />
        أجب بصدق للحصول على نتائج دقيقة
      </div>
    </div>
  );
};

export default ReadinessToChangeAssessment;
