import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AskPage() {
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
                className="w-32 h-32 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center mb-6"
              >
                <HelpCircle className="w-20 h-20 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 text-center">ضع سؤالك</h1>
              <p className="text-gray-600 mt-2 text-center">اطرح أسئلتك واحصل على إجابات من المختصين</p>
            </div>

            <div className="space-y-6">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">الاسم (اختياري)</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="أدخل اسمك"
                  />
                </div>
                
                <div>
                  <label htmlFor="question" className="block text-gray-700 mb-2">سؤالك</label>
                  <textarea
                    id="question"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="اكتب سؤالك هنا..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">نوع السؤال</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-colors"
                    >
                      طبي
                    </button>
                    <button
                      type="button"
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-colors"
                    >
                      نفسي
                    </button>
                    <button
                      type="button"
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-colors"
                    >
                      في الإدمان
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors"
                >
                  إرسال السؤال
                </button>
              </form>

              <div className="bg-rose-50 rounded-lg p-6">
                <h3 className="font-semibold text-rose-800 mb-2">ملاحظات مهمة:</h3>
                <ul className="list-disc list-inside space-y-2 text-rose-700">
                  <li>سيتم الرد على سؤالك في أقرب وقت</li>
                  <li>يمكنك طرح السؤال بشكل مجهول</li>
                  <li>نضمن خصوصية وسرية جميع الأسئلة</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AskPage;