import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AboutUsPage() {
  useEffect(() => {
    // Load Teliportme script
    const script = document.createElement('script');
    script.src = 'https://teliportme.com/js/embed.js';
    script.setAttribute('data-teliportme', 'https://teliportme.com/virtualtour/b69261f7');
    script.setAttribute('data-height', '360');
    script.setAttribute('data-width', '640');
    
    // Add script to document
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowRight className="ml-2" />
            <span>العودة للرئيسية</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mb-6"
              >
                <Building2 className="w-20 h-20 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 text-center">تجول معنا</h1>
              <p className="text-gray-600 mt-2 text-center">تعرف على مرافقنا وخدماتنا من خلال جولة افتراضية</p>
            </div>

            <div className="space-y-8">
              {/* Virtual Tour Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">جولة افتراضية في مرافقنا</h2>
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe 
                    src="https://teliportme.com/virtualtour/b69261f7"
                    title="جولة افتراضية في مجمع إرادة"
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* VR Tour Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">جولة VR في طريق الإدمان وطريق التعافي</h2>
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg mx-auto max-w-4xl">
                  <iframe 
                    height="360"
                    width="640"
                    src="https://gallery.styly.cc/scene/bc3b7ad3-45e7-4be1-984c-d18a85b0ba6f/embed"
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
                <p className="text-gray-600 mt-4 text-center">
                  استكشف رحلة التعافي من خلال تجربة افتراضية تفاعلية
                </p>
              </div>

              {/* Virtual Tour Description */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  هذه جولة معدة خصيصًا لك لتتعرف على الخطوات التي سترافق رحلتك في مجمع إرادة لعلاج الإدمان. من لحظة وصولك، سنوضح لك كيف يتم استقبال المرضى وتقييم احتياجاتهم الصحية والنفسية. ستتعرف على المرافق التي ستدعمك، مثل العيادات الطبية، جلسات العلاج النفسي، وبرامج التأهيل التي تم تصميمها لمساعدتك على استعادة حياتك. سنأخذك في جولة عبر المرافق الرياضية والترفيهية التي تساعد على تعزيز صحتك البدنية والنفسية، ونشرح لك كيفية تقديم الرعاية المستمرة لتكون مستعدًا لبداية جديدة مليئة بالأمل والثقة. هذا الفيديو دليل يساعدك على فهم الخطوات ويمنحك الثقة بأنك في المكان المناسب لتحقيق الشفاء.
                </p>
              </div>

              {/* Facilities Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3">مرافقنا</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>غرف علاج حديثة ومجهزة</li>
                    <li>صالات للأنشطة الترفيهية</li>
                    <li>مساحات خضراء للاسترخاء</li>
                    <li>قاعات للجلسات الجماعية</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3">خدماتنا</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>برامج علاجية متكاملة</li>
                    <li>استشارات نفسية</li>
                    <li>جلسات دعم جماعية</li>
                    <li>متابعة ما بعد التعافي</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUsPage;