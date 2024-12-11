import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ChatPage() {
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
                className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-6"
              >
                <MessageCircle className="w-20 h-20 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 text-center">تحدث مع عارف</h1>
              <p className="text-gray-600 mt-2 text-center">احصل على نصائح فورية ودعم من عارف الذكي</p>
            </div>

            <div className="relative w-[400px] h-[600px] mx-auto">
              <iframe 
                id="audio_iframe" 
                src="https://widget.synthflow.ai/widget/v2/1731952115631x319641083575379800/1731952115132x729865938300433200" 
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

export default ChatPage;