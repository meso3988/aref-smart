import { useState } from 'react';
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Bot, PlayCircle } from 'lucide-react';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dzafrepxq'
  }
});

interface VideoItem {
  title: string;
  description: string;
  publicId: string;
}

const videos: VideoItem[] = [
  {
    title: "كلمات تحفيزية لدعم مرحلة الوعي والإقرار بالمشكلة",
    description: "عبارات تساعدك على تقبل الواقع والاعتراف بالتحدي",
    publicId: "كلمات_تحفيزيةلمرحلة_التحضير_والقبول_1_mbbfnk.mov"
  },
  {
    title: "كلمات تحفيزية لدعم مرحلة التحضير والقبول",
    description: "عبارات تعزز استعدادك للتغيير وقبول المساعدة",
    publicId: "لمرحلة_التحضير_والقبول_m5z7jj.mov"
  },
  {
    title: "كلمات تحفيزية لدعم مرحلة التخلص من السموم",
    description: "عبارات تقوي عزيمتك خلال فترة التخلص من السموم",
    publicId: "مرحلة_التخلص_من_السموم_w9cjb1.mov"
  },
  {
    title: "كلمات تحفيزية لدعم مرحلة التأهيل",
    description: "عبارات تدعم رحلتك في مرحلة التأهيل",
    publicId: "مرحلة_التأهيل_e2zyvh.mov"
  },
  {
    title: "كلمات تحفيزية لدعم مرحلة التعافي المبكر",
    description: "عبارات تشجعك في بداية رحلة التعافي",
    publicId: "التعافي_المبكر_lqlf4r.mov"
  },
  {
    title: "كلمات تحفيزية لدعم مرحلة التعافي المستمر",
    description: "عبارات تدعم استمرارك في التعافي",
    publicId: "التعافي_المستمر_xdgygm.mov"
  },
  {
    title: "كلمات تحفيزية لدعم مرحلة الوقاية من الانتكاسة",
    description: "عبارات تقوي مناعتك ضد الانتكاسة",
    publicId: "مرحلة_الوقاية_من_الانتكاسة_twnenc.mov"
  },
  {
    title: "كلمات تحفيزية لدعم مرحلة إعادة بناء الحياة",
    description: "عبارات تدعمك في بناء حياة جديدة",
    publicId: "مرحلة_اعادة_بناء_الحياة_xqfog2.mov"
  },
  {
    title: "كلمات تحفيزية لدعم جميع المراحل",
    description: "عبارات عامة تدعمك في كل مراحل التعافي",
    publicId: "كلمات_تحفيزية_لدعم_جميع_المراحل_rvq6kf.mov"
  }
];

const MotivationalWords = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* المقدمة */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          كلمات عارف التحفيزية
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          مجموعة من التوكيدات الإيجابية والعبارات التحفيزية التي تدعم رحلة تعافيك في كل مرحلة.
          استمع إليها يومياً، رددها بصوت عالٍ، واجعلها جزءاً من روتينك اليومي.
        </p>
      </div>

      {/* كيفية الاستخدام */}
      <div className="bg-blue-50 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">كيف تستفيد من هذه الكلمات التحفيزية؟</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="font-bold">1.</span>
            <span>اختر المقطع المناسب لمرحلتك الحالية في رحلة التعافي</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">2.</span>
            <span>استمع إلى الكلمات في مكان هادئ يساعدك على التركيز</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">3.</span>
            <span>ردد الكلمات بصوت عالٍ مع المقطع - هذا يعزز تأثيرها الإيجابي</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">4.</span>
            <span>اجعلها جزءاً من روتينك اليومي - مثلاً في الصباح أو قبل النوم</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">5.</span>
            <span>دوّن الكلمات التي تؤثر فيك بشكل خاص واجعلها شعارك اليومي</span>
          </li>
        </ul>
      </div>

      {/* عرض الفيديوهات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.publicId}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
              <p className="text-gray-600 mb-4">{video.description}</p>
              <button
                onClick={() => setSelectedVideo(video)}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <PlayCircle className="w-5 h-5" />
                <span>استمع الآن</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* مشغل الفيديو */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 max-w-4xl w-full">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
              <p className="text-gray-600">{selectedVideo.description}</p>
            </div>
            <div className="relative pt-[56.25%]">
              <AdvancedVideo
                cldVid={cld.video(selectedVideo.publicId)}
                controls
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              />
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MotivationalWords;
