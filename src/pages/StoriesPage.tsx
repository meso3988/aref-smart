import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Volume2, Users, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MixCloudPlayer from '../components/MixCloudPlayer';

function StoriesPage() {
  const navigate = useNavigate();
  
  const stories = [
    {
      id: 1,
      title: "قصة تعافي محمد",
      feedUrl: "/quality398/قصة-تعافي-محمد-من-الادمان/",
      listeners: 250,
      likes: 120
    },
    {
      id: 2,
      title: "قصة تعافي ناصر",
      feedUrl: "/quality398/قصة-تعافي-ناصر-من-الادمان/",
      listeners: 180,
      likes: 95
    },
    {
      id: 3,
      title: "قصة تعافي عبدالعزيز",
      feedUrl: "/quality398/قصة-تعافي-عبدالعزيز-من-الادمان/",
      listeners: 165,
      likes: 88
    },
    {
      id: 4,
      title: "قصة تعافي جنى",
      feedUrl: "/quality398/قصة-تعافي-جنى-من-الادمان/",
      listeners: 210,
      likes: 115
    },
    {
      id: 5,
      title: "قصة تعافي مازن",
      feedUrl: "/quality398/قصة-تعافي-مازن-من-الادمان/",
      listeners: 195,
      likes: 102
    },
    {
      id: 6,
      title: "قصة تعافي المهندس أحمد",
      feedUrl: "/quality398/قصة-تعافي-المهندس-أحمد/",
      listeners: 230,
      likes: 125
    },
    {
      id: 7,
      title: "قصة تعافي عمر",
      feedUrl: "/quality398/قصة-تعافي-عمر-من-الإدمان/",
      listeners: 175,
      likes: 93
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
                className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-6"
              >
                <Users className="w-20 h-20 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 text-center">قصص المتعافين</h1>
              <p className="text-gray-600 mt-2 text-center">استمع إلى قصص ملهمة من أشخاص تغلبوا على الإدمان</p>
            </div>

            <div className="space-y-8">
              {/* Audio Stories */}
              {stories.map((story) => (
                <div key={story.id} className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                      <Volume2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{story.title}</h3>
                      <p className="text-gray-600">رحلة من الإدمان إلى التعافي</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <MixCloudPlayer
                      title={story.title}
                      feedUrl={story.feedUrl}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{story.listeners} مستمع</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span>{story.likes} إعجاب</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Story Description */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h4 className="text-lg font-semibold mb-4">عن القصص</h4>
                <p className="text-gray-600 leading-relaxed">
                  في هذه القصص الملهمة، يشارك المتعافون تجاربهم الشخصية في التغلب على الإدمان. 
                  يتحدثون عن التحديات التي واجهوها، والدعم الذي تلقوه، وكيف استطاعوا بناء حياة 
                  جديدة مليئة بالأمل والإنجازات. قصصهم هي دليل على أن التعافي ممكن مع 
                  الإرادة والدعم المناسب.
                </p>
              </div>

              {/* Call to Action */}
              <div className="text-center bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-8 text-white">
                <h4 className="text-xl font-semibold mb-2">هل لديك قصة تعافي تريد مشاركتها؟</h4>
                <p className="mb-4 text-purple-100">
                  شارك تجربتك وألهم الآخرين في رحلتهم نحو التعافي
                </p>
                <button 
                  onClick={() => navigate('/share-story')}
                  className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg transition-colors"
                >
                  شارك قصتك الآن
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StoriesPage;