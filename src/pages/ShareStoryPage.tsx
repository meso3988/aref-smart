import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PenTool, Upload, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ShareStoryPage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    duration: '',
    story: '',
    audioFile: null as File | null,
  });

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

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
                className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mb-6"
              >
                <PenTool className="w-20 h-20 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 text-center">هل أنت متعافي؟ ضع قصتك</h1>
              <p className="text-gray-600 mt-2 text-center">شارك قصة تعافيك لتلهم الآخرين في رحلتهم</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">الاسم (اختياري)</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="يمكنك استخدام اسم مستعار"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-gray-700 mb-2">العمر</label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="أدخل عمرك"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-gray-700 mb-2">مدة التعافي</label>
                <input
                  type="text"
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="مثال: سنة وشهرين"
                />
              </div>

              <div>
                <label htmlFor="story" className="block text-gray-700 mb-2">قصتك</label>
                <textarea
                  id="story"
                  rows={6}
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="شارك قصة تعافيك هنا..."
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">تسجيل صوتي (اختياري)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">اسحب وأفلت ملف صوتي هنا</p>
                  <p className="text-gray-500 text-sm">أو</p>
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    اختر ملفاً
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                إرسال القصة
              </button>

              <p className="text-sm text-gray-500 text-center">
                * سيتم مراجعة القصة قبل نشرها للتأكد من مناسبتها
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ShareStoryPage;