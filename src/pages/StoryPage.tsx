import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Volume2, PauseCircle, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateStory } from '../utils/storyGenerator';
import { useSpeech } from '../hooks/useSpeech';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function StoryPage() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [story, setStory] = useState('');
  const [error, setError] = useState('');
  const { isPlaying, togglePlayPause } = useSpeech();

  const handleGenerateStory = () => {
    if (!name.trim()) {
      setError('الرجاء إدخال اسمك');
      return;
    }
    if (!gender) {
      setError('الرجاء اختيار الجنس');
      return;
    }
    setError('');
    const generatedStory = generateStory({ name, gender });
    setStory(generatedStory);
  };

  const handlePlayPause = () => {
    if (!story) return;
    togglePlayPause(story);
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
                className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-6"
              >
                <Headphones className="w-20 h-20 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 text-center">اسمع قصتك</h1>
              <p className="text-gray-600 mt-2 text-center">ضع اسمك واستمع لقصتك معنا</p>
            </div>
            
            <div className="mb-8 space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك هنا"
                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-right"
                dir="rtl"
              />

              <div className="flex gap-4">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    gender === 'male'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-200'
                  }`}
                >
                  ذكر
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    gender === 'female'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-200'
                  }`}
                >
                  أنثى
                </button>
              </div>

              <button
                onClick={handleGenerateStory}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <span>أنشئ قصتك</span>
              </button>

              {error && (
                <p className="text-red-500 text-center">{error}</p>
              )}
            </div>

            {story && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <button
                    onClick={handlePlayPause}
                    className={`flex items-center gap-2 px-8 py-4 rounded-lg transition-colors ${
                      isPlaying 
                        ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <PauseCircle className="w-6 h-6" />
                        <span>إيقاف الاستماع</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-6 h-6" />
                        <span>استمع للقصة</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div 
                  className="story-container overflow-y-auto p-6 rounded-lg text-right leading-relaxed"
                  style={{
                    backgroundImage: 'url(https://i.imgur.com/FzFiAOB.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#1a365d',
                    textShadow: '1px 1px 1px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {story.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0 text-lg font-bold" style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.9)' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StoryPage;