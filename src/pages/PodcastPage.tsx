import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MixCloudPlayer from '../components/MixCloudPlayer';

function PodcastPage() {
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
                className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-6"
              >
                <Radio className="w-20 h-20 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 text-center">بودكاست عارف</h1>
              <p className="text-gray-600 mt-2 text-center">استمع إلى لقاءات مع المختصين وقصص ملهمة</p>
            </div>

            <div className="space-y-8">
              {/* Latest Episode */}
              <div className="bg-pink-50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                    <Radio className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">لقاء مع طبيب الإدمان</h3>
                    <p className="text-gray-600">الحلقة الأولى من بودكاست عارف</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <MixCloudPlayer
                    title="بودكاست عارف - لقاء مع طبيب الادمان"
                    feedUrl="https://www.mixcloud.com/quality398/بودكاست-عارف-لقاء-مع-طبيب-الادمان-١/"
                  />
                </div>
              </div>

              {/* Second Episode */}
              <div className="bg-pink-50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                    <Radio className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">لقاء مع متعافي</h3>
                    <p className="text-gray-600">الحلقة الثانية من بودكاست عارف</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <MixCloudPlayer
                    title="لقاء مع متعافي"
                    feedUrl="https://www.mixcloud.com/quality398/لقاء-مع-متعافي/"
                  />
                </div>
              </div>

              {/* About the Podcast */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h4 className="text-lg font-semibold mb-4">عن البودكاست</h4>
                <p className="text-gray-600 leading-relaxed">
                  بودكاست عارف هو سلسلة من اللقاءات المتخصصة التي تهدف إلى تقديم المعرفة 
                  والدعم لمن يحتاجه. نستضيف في كل حلقة خبيراً متخصصاً أو شخصاً لديه تجربة 
                  ملهمة في رحلة التعافي، لنشارك معكم الخبرات والنصائح القيمة.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PodcastPage;