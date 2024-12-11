import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">من نحن</h4>
            <p className="text-gray-600 leading-relaxed">
              نحن فريق الجودة وسلامة المرضى في مجمع إرادة خدمات إرادة، يدفعنا الشغف وحب الإبداع وتقديم أفضل الخدمات الصحية للمرضى لأن ننشئ مثل هذه البوابة التي تهدف إلى تمكين المرضى من خلال المعرفة والدعم المستمر. نسعى لتقديم تجربة فريدة تجمع بين التقنية الحديثة والرعاية الإنسانية، لنكون جسراً يربط بين المريض ورحلة تعافيه.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">الرئيسية</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">خدماتنا</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">اتصل بنا</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">المساعدة</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">الأسئلة الشائعة</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">سياسة الخصوصية</li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors">الشروط والأحكام</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-600 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-600 hover:text-pink-600 cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-gray-600 hover:text-red-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm pt-8 border-t">
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()} عارف الذكي</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;