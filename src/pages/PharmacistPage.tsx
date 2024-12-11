import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Pill, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PharmacistPage() {
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
                className="w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mb-6"
              >
                <Pill className="w-20 h-20 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 text-center">عارف المثقف الدوائي</h1>
              <p className="text-gray-600 mt-2 text-center">استشر عارف المثقف الدوائي حول الأدوية وآثارها</p>
            </div>

            {/* Medical Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 bg-red-50 border-2 border-red-200 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-red-700 mb-2">ملاحظة هامة</h2>
                  <p className="text-lg text-red-600">
                    هذه المحادثة للمعرفة العامة ولابد من مراجعة الطبيب في الاستشارات الدوائية
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="relative w-[400px] h-[600px] mx-auto">
              <iframe 
                id="audio_iframe" 
                src="https://widget.synthflow.ai/widget/v2/1731972119998x442808465936925800/1731972119884x618714025604439000" 
                allow="microphone" 
                width="400" 
                height="600" 
                className="absolute top-0 left-0"
                style={{ 
                  border: 'none',
                  background: 'transparent'
                }}
              />
              {/* Overlay to hide bottom part */}
              <div className="absolute bottom-0 left-0 w-full h-16 bg-white" />
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PharmacistPage;