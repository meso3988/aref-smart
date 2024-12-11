import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Headphones, 
  Book, 
  Puzzle,
  Building2,
  HelpCircle,
  Smile,
  Search,
  Pill,
  PenTool,
  Radio,
  LineChart
} from 'lucide-react';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';
import BackgroundAnimation from '../components/BackgroundAnimation';
import MixCloudPlayer from '../components/MixCloudPlayer';

function HomePage() {
  const features = [
    {
      title: 'تحدث مع عارف',
      description: 'احصل على نصائح فورية ودعم من عارف الذكي',
      icon: MessageCircle,
      color: 'bg-blue-500',
      path: '/chat',
      imageUrl: 'https://i.imgur.com/MEreSgs.png'
    },
    {
      title: 'تشخيص استرشادي مع عارف',
      description: 'تشخيص استرشادي ذكي للاضطرابات النفسية المصاحبة للإدمان',
      icon: LineChart,
      color: 'bg-purple-500',
      path: '/diagnostic-guide',
      imageUrl: 'https://res.cloudinary.com/dzafrepxq/image/upload/v1733783399/Screenshot_1446-06-09_at_1.29.27_AM_eybfp0.png'
    },
    {
      title: 'تحدث مع عارف المثقف الدوائي',
      description: 'استشر عارف المثقف الدوائي حول الأدوية وآثارها',
      icon: Pill,
      color: 'bg-teal-500',
      path: '/pharmacist',
      imageUrl: 'https://i.imgur.com/PzpXtJ5.png'
    },
    {
      title: 'تجول معنا',
      description: 'تعرف على مرافقنا وخدماتنا بجولة افتراضية',
      icon: Building2,
      color: 'bg-indigo-500',
      path: '/about',
      imageUrl: 'https://i.imgur.com/JHVz9Cw.png'
    },
    {
      title: 'اسمع قصتك',
      description: 'ضع اسمك واستمع لقصتك معنا',
      icon: Headphones,
      color: 'bg-green-500',
      path: '/story',
      imageUrl: 'https://i.imgur.com/P1gxZ3u.png'
    },
    {
      title: 'قصص المتعافين',
      description: 'اكتشف قصص النجاح والأمل من أولئك الذين تغلبوا على الإدمان',
      icon: Book,
      color: 'bg-purple-500',
      path: '/stories',
      imageUrl: 'https://i.imgur.com/zKeq18n.png'
    },
    {
      title: 'بودكاست عارف',
      description: 'استمع إلى لقاءات مع المختصين وقصص ملهمة',
      icon: Radio,
      color: 'bg-pink-500',
      path: '/podcast',
      imageUrl: 'https://i.imgur.com/OUTcxpM.png'
    },
    {
      title: 'الألعاب التعليمية',
      description: 'العب واختبر معرفتك وتعلم عن التعافي',
      icon: Puzzle,
      color: 'bg-purple-500',
      path: '/games',
      imageUrl: 'https://i.imgur.com/1qh8SI4.png'
    },
    {
      title: 'ضع سؤالك',
      description: 'اطرح أسئلتك واحصل على إجابات من المختصين',
      icon: HelpCircle,
      color: 'bg-rose-500',
      path: '/ask',
      imageUrl: 'https://i.imgur.com/60CSUua.png'
    },
    {
      title: 'خفف توترك',
      description: 'تمارين وتقنيات للاسترخاء والتأمل',
      icon: Smile,
      color: 'bg-orange-500',
      path: '/relax',
      imageUrl: 'https://i.imgur.com/8LZ0YGq.png'
    },
    {
      title: 'هل أنت متعافي؟ ضع قصتك',
      description: 'شارك قصة تعافيك لتلهم الآخرين في رحلتهم',
      icon: PenTool,
      color: 'bg-cyan-500',
      path: '/share-story',
      imageUrl: 'https://i.imgur.com/bEwY4Fj.png'
    },
    {
      title: 'كلمات عارف التحفيزية',
      description: 'كلمات تحفيزية من عارف لكل مرحلة من مراحل التعافي',
      icon: MessageCircle,
      color: 'bg-emerald-500',
      path: '/motivational-words',
      imageUrl: 'https://res.cloudinary.com/dzafrepxq/image/upload/v1733693205/positive_w_swo08v.png'
    },
    {
      title: 'التقييم الذاتي مع عارف',
      description: 'قيم نفسك مع عارف الذكي، اعرف أين أنت في مراحل التعافي واحتمالية انتكاستك وغيرها من التقييمات الذكية',
      icon: LineChart,
      color: 'bg-violet-500',
      path: '/self-assessment',
      imageUrl: 'https://res.cloudinary.com/dzafrepxq/image/upload/v1733698927/Screenshot_1446-06-08_at_2.01.31_AM_ocmdpl.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
      <BackgroundAnimation />
      
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-xl text-gray-600 mb-2">مرحباً بك</h2>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-2">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              المعرفة تقودك إلى التعافي
            </span>
          </h1>
          
          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-64 h-64 mx-auto mb-4"
          >
            <img 
              src="https://i.imgur.com/YJrR2PS.png"
              alt="عارف الذكي"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <p className="text-base text-gray-500">
            بوابة التثقيف لمن يعاني من الإدمان
          </p>
        </motion.div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن المواضيع التي تهمك..."
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-right pr-14"
            />
            <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        {/* Latest Podcast Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">أحدث حلقات بودكاست عارف</h3>
              <p className="text-gray-600">لقاء مع طبيب الإدمان</p>
            </div>
          </div>
          <MixCloudPlayer
            title="بودكاست عارف - لقاء مع طبيب الادمان"
            feedUrl="/quality398/بودكاست-عارف-لقاء-مع-طبيب-الادمان-١/"
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;