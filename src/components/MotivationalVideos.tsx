import React from 'react';

interface VideoItem {
  title: string;
  url: string;
  description: string;
}

const MotivationalVideos: React.FC = () => {
  const videos: VideoItem[] = [
    {
      title: "كلمات تحفيزية لدعم مرحلة الوعي والاقرار بالمشكلة",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/v1733750088/%D9%83%D9%84%D9%85%D8%A7%D8%AA_%D8%AA%D8%AD%D9%81%D9%8A%D8%B2%D9%8A%D8%A9%D9%84%D9%85%D8%B1%D8%AD%D9%84%D8%A9_%D8%A7%D9%84%D8%AA%D8%AD%D8%B6%D9%8A%D8%B1_%D9%88%D8%A7%D9%84%D9%82%D8%A8%D9%88%D9%84_1_mbbfnk.mov",
      description: "كلمات تحفيزية تساعدك على الإقرار والوعي بالمشكلة"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة التحضير والقبول",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/v1733760657/%D9%84%D9%85%D8%B1%D8%AD%D9%84%D8%A9_%D8%A7%D9%84%D8%AA%D8%AD%D8%B6%D9%8A%D8%B1_%D9%88%D8%A7%D9%84%D9%82%D8%A8%D9%88%D9%84_m5z7jj.mov",
      description: "كلمات تحفيزية تدعمك في مرحلة التحضير والقبول"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة التخلص من السموم",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/v1733760658/%D9%85%D8%B1%D8%AD%D9%84%D8%A9_%D8%A7%D9%84%D8%AA%D8%AE%D9%84%D8%B5_%D9%85%D9%86_%D8%A7%D9%84%D8%B3%D9%85%D9%88%D9%85_w9cjb1.mov",
      description: "كلمات تحفيزية تساعدك في مرحلة التخلص من السموم"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة التأهيل",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/v1733760754/%D9%85%D8%B1%D8%AD%D9%84%D8%A9_%D8%A7%D9%84%D8%AA%D8%A7%D9%94%D9%87%D9%8A%D9%84_e2zyvh.mov",
      description: "كلمات تحفيزية تدعمك في مرحلة التأهيل"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة التعافي المبكر",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/v1733760739/%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%81%D9%8A_%D8%A7%D9%84%D9%85%D8%A8%D9%83%D8%B1_lqlf4r.mov",
      description: "كلمات تحفيزية تساعدك في مرحلة التعافي المبكر"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة التعافي المستمر",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/v1733760718/%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%81%D9%8A_%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%85%D8%B1_xdgygm.mov",
      description: "كلمات تحفيزية تدعمك في مرحلة التعافي المستمر"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة الوقاية من الانتكاسة",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/v1733760820/%D9%85%D8%B1%D8%AD%D9%84%D8%A9_%D8%A7%D9%84%D9%88%D9%82%D8%A7%D9%8A%D8%A9_%D9%85%D9%86_%D8%A7%D9%84%D8%A7%D9%86%D8%AA%D9%83%D8%A7%D8%B3%D8%A9_twnenc.mov",
      description: "كلمات تحفيزية تساعدك في الوقاية من الانتكاسة"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة اعادة بناء الحياة",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/v1733760813/%D9%85%D8%B1%D8%AD%D9%84%D8%A9_%D8%A7%D8%B9%D8%A7%D8%AF%D8%A9_%D8%A8%D9%86%D8%A7%D8%A1_%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%A9_xqfog2.mov",
      description: "كلمات تحفيزية تساعدك في مرحلة إعادة بناء الحياة"
    },
    {
      title: "كلمات تحفيزية لدعم جميع المراحل",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/v1733760568/%D9%83%D9%84%D9%85%D8%A7%D8%AA_%D8%AA%D8%AD%D9%81%D9%8A%D8%B2%D9%8A%D8%A9_%D9%84%D8%AF%D8%B9%D9%85_%D8%AC%D9%85%D9%8A%D8%B9_%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D8%AD%D9%84_rvq6kf.mov",
      description: "كلمات تحفيزية عامة تدعمك في جميع مراحل التعافي"
    }
  ];

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">كلمات عارف التحفيزية</h2>
        <p className="text-lg text-center mb-8 text-gray-600">
          مجموعة من الكلمات التحفيزية التي تساعدك في رحلة التعافي. قم بترديد هذه الكلمات يومياً لتعزيز قوتك وإيمانك بقدرتك على التعافي.
          استمع إلى هذه الكلمات في وقت هادئ، وكررها بصوت مسموع أو في داخلك لتثبيت معانيها في عقلك وقلبك.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-primary">{video.title}</h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <video 
                  className="w-full rounded-lg"
                  controls
                  preload="none"
                  poster="/video-thumbnail.png"
                >
                  <source src={video.url} type="video/quicktime" />
                  متصفحك لا يدعم تشغيل الفيديو
                </video>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotivationalVideos;
