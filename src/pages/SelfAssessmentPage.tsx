import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LineChart, Brain, Activity, TrendingUp, Stethoscope, ArrowRight, Scale, AlertTriangle } from 'lucide-react';
import RecoveryStageAssessment from '../components/assessments/RecoveryStageAssessment';
import DASTAssessment from '../components/assessments/DASTAssessment';
import RelapsePredictionAssessment from '../components/assessments/RelapsePredictionAssessment';
import ReadinessToChangeAssessment from '../components/assessments/ReadinessToChangeAssessment';
import AwareAssessment from '../components/assessments/AwareAssessment';

function SelfAssessmentPage() {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  
  const assessments = [
    {
      id: 'recovery-stage',
      title: "تقييم مرحلة التعافي",
      description: "تعرف على مرحلتك الحالية في رحلة التعافي وما هي الخطوات القادمة",
      icon: TrendingUp,
      color: "bg-blue-500"
    },
    {
      id: 'readiness-to-change',
      title: "مقياس الاستعداد للتغيير (RCQ)",
      description: "قيّم مدى استعدادك النفسي والعقلي للبدء في رحلة التغيير الإيجابي",
      icon: Scale,
      color: "bg-amber-500"
    },
    {
      id: 'dast',
      title: "اختبار فحص تعاطي المخدرات (DAST)",
      description: "تقييم شامل لتحديد مستوى تعاطي المخدرات وتأثيره على حياتك",
      icon: Stethoscope,
      color: "bg-emerald-500"
    },
    {
      id: 'relapse-risk',
      title: "تقييم احتمالية الانتكاس (RPS)",
      description: "قيم العوامل التي قد تؤدي إلى الانتكاس واحصل على نصائح للوقاية",
      icon: Activity,
      color: "bg-red-500"
    },
    {
      id: 'psychological',
      title: "التقييم النفسي",
      description: "تقييم شامل لحالتك النفسية وتأثيرها على رحلة تعافيك",
      icon: Brain,
      color: "bg-purple-500"
    },
    {
      id: 'aware',
      title: "علامات التحذير المبكرة للانتكاسة (AWARE)",
      description: "تعرف على المؤشرات المبكرة التي قد تسبق الانتكاسة وكيفية التعامل معها",
      icon: AlertTriangle,
      color: "bg-yellow-500"
    }
  ];

  const renderAssessment = () => {
    switch (selectedAssessment) {
      case 'recovery-stage':
        return <RecoveryStageAssessment />;
      case 'readiness-to-change':
        return <ReadinessToChangeAssessment />;
      case 'dast':
        return <DASTAssessment />;
      case 'relapse-risk':
        return <RelapsePredictionAssessment />;
      case 'aware':
        return <AwareAssessment />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* زر العودة للرئيسية */}
        <div className="mb-6">
          <a 
            href="/"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            <span>العودة للرئيسية</span>
          </a>
        </div>

        {!selectedAssessment ? (
          <>
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-violet-500 rounded-full flex items-center justify-center">
                  <LineChart className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                التقييم الذاتي مع عارف
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                قيم نفسك مع عارف الذكي، واكتشف أين أنت في رحلة التعافي
              </p>

              {/* Hero Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative max-w-2xl mx-auto mb-16"
              >
                <img 
                  src="https://res.cloudinary.com/dzafrepxq/image/upload/v1733698927/Screenshot_1446-06-08_at_2.01.31_AM_ocmdpl.png"
                  alt="التقييم الذاتي مع عارف"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </motion.div>
            </motion.div>

            {/* Assessment Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {assessments.map((assessment, index) => (
                <motion.div
                  key={assessment.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelectedAssessment(assessment.id)}
                >
                  <div className={`w-16 h-16 ${assessment.color} rounded-full flex items-center justify-center mb-6`}>
                    {<assessment.icon className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{assessment.title}</h3>
                  <p className="text-gray-600">{assessment.description}</p>
                  <button className="mt-6 px-6 py-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 transition-colors duration-300">
                    ابدأ التقييم
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Additional Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                لماذا التقييم الذاتي مهم؟
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed text-center">
                يساعدك التقييم الذاتي المنتظم على فهم تقدمك في رحلة التعافي، وتحديد نقاط القوة والتحديات التي تواجهك.
                من خلال هذه التقييمات، يمكن لعارف تقديم توصيات مخصصة ودعم موجه لاحتياجاتك الفردية.
              </p>
            </motion.div>
          </>
        ) : (
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setSelectedAssessment(null)}
              className="mb-8 px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
            >
              العودة إلى التقييمات
            </button>
            {renderAssessment()}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default SelfAssessmentPage;
