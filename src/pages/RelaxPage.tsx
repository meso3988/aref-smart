import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smile, Music, Bird, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SoundSection from '../components/relax/SoundSection';
import ExerciseCard from '../components/relax/ExerciseCard';

function RelaxPage() {
  const exercises = [
    {
      title: "تمرين التنفس العميق",
      duration: "5 دقائق",
      description: "تمرين بسيط للتنفس يساعد على تهدئة العقل والجسم",
      url: "/relax/breathing",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80"
    },
    {
      title: "تأمل الاسترخاء العضلي",
      duration: "10 دقائق",
      description: "تمرين تدريجي للاسترخاء العضلي الكامل",
      url: "#",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
    },
    {
      title: "تأمل التركيز الذهني",
      duration: "15 دقيقة",
      description: "جلسة تأمل لتحسين التركيز والوعي الذاتي",
      url: "#",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80"
    }
  ];

  const natureSounds = [
    {
      title: "صوت المطر الهادئ",
      duration: "30 دقيقة",
      icon: "🌧️",
      feedUrl: "/OWM/rainforest-natural-sounds/",
      image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80"
    },
    {
      title: "أمواج البحر",
      duration: "45 دقيقة",
      icon: "🌊",
      feedUrl: "/yogatea/relax-with-nature-ocean-waves-at-sunset/",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80"
    },
    {
      title: "غابة هادئة",
      duration: "60 دقيقة",
      icon: "🌳",
      feedUrl: "/kaorusaito1955/am637-58-1-april-2014-in-the-university-of-tokyo-chichibu-forest-at-tetto-natural-forest-sound/",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80"
    }
  ];

  const relaxingMusic = [
    {
      title: "موسيقى البيانو الهادئة",
      duration: "20 دقيقة",
      icon: "🎹",
      feedUrl: "/oNlineRXD/just-relax-sleep-music/",
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80"
    },
    {
      title: "نغمات التأمل",
      duration: "30 دقيقة",
      icon: "🎵",
      feedUrl: "/wsmySunShine/3-hour-relaxing-guitar-music-meditation-music-instrumental-music-calming-music-soft-music/",
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80"
    },
    {
      title: "موسيقى الاسترخاء",
      duration: "40 دقيقة",
      icon: "🎼",
      feedUrl: "/keigo-tanaka/inner-light-music-for-meditation/",
      image: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&q=80"
    }
  ];

  const prayers = [
    {
      title: "أذكار الصباح",
      duration: "15 دقيقة",
      icon: "🌅",
      feedUrl: "/Telawa/athkar_al-sabah/",
      image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&q=80"
    },
    {
      title: "أذكار المساء",
      duration: "15 دقيقة",
      icon: "🌄",
      feedUrl: "/Telawa/athkar_al-masaa/",
      image: "https://images.unsplash.com/photo-1472068113808-609faf3a6cf1?auto=format&fit=crop&q=80"
    },
    {
      title: "دعاء السكينة",
      duration: "10 دقائق",
      icon: "🤲",
      feedUrl: "/jalyatunaizah/%D8%B1%D8%A8%D9%8A-%D9%85%D8%A7-%D8%A3%D8%AD%D9%84%D9%85%D9%83-%D8%AF%D8%B9%D8%A7%D8%A1-%D8%AC%D9%85%D9%8A%D9%84/",
      image: "https://images.unsplash.com/photo-1507697364665-69eec30ea71e?auto=format&fit=crop&q=80"
    }
  ];

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
                className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-6"
              >
                <Smile className="w-20 h-20 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 text-center">خفف توترك</h1>
              <p className="text-gray-600 mt-2 text-center">تمارين وتقنيات للاسترخاء والتأمل</p>
            </div>

            <div className="space-y-8">
              {/* Breathing Exercises Section */}
              <div className="grid gap-6">
                {exercises.map((exercise, index) => (
                  <Link 
                    key={index}
                    to={exercise.url}
                    className="block transform transition-transform hover:scale-[1.02]"
                  >
                    <ExerciseCard
                      {...exercise}
                      index={index}
                    />
                  </Link>
                ))}
              </div>

              <SoundSection
                title="أصوات الطبيعة"
                description="استمع لأصوات الطبيعة المريحة"
                items={natureSounds}
                Icon={Bird}
                bgColor="bg-green-50"
                buttonColor="bg-green-500"
              />

              <SoundSection
                title="موسيقى استرخاء"
                description="استمع لموسيقى هادئة للاسترخاء"
                items={relaxingMusic}
                Icon={Music}
                bgColor="bg-purple-50"
                buttonColor="bg-purple-500"
              />

              <SoundSection
                title="أذكار مريحة"
                description="استمع للأذكار والأدعية المريحة للنفس"
                items={prayers}
                Icon={BookOpen}
                bgColor="bg-blue-50"
                buttonColor="bg-blue-500"
              />

              <div className="bg-white rounded-xl border border-orange-100 p-6">
                <h3 className="text-xl font-semibold mb-4">نصائح للاسترخاء</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>اختر مكاناً هادئاً ومريحاً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>ابدأ بتمارين قصيرة وزد المدة تدريجياً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>حاول الممارسة في نفس الوقت يومياً</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>لا تقلق إذا تشتت ذهنك، هذا طبيعي</span>
                  </li>
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

export default RelaxPage;