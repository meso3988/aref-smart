import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Select,
  Radio,
  RadioGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  List,
  ListItem,
  useToast,
  Progress,
  Flex,
  Circle,
  Divider,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageCircle } from 'lucide-react';

interface VideoItem {
  title: string;
  url: string;
  description: string;
}

function MotivationalWordsPage() {
  const videos: VideoItem[] = [
    {
      title: "كلمات تحفيزية لدعم مرحلة الوعي والاقرار بالمشكلة",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/q_auto,f_auto/v1733750088/كلمات_تحفيزيةلمرحلة_التحضير_والقبول_1_mbbfnk.mov",
      description: "كلمات تحفيزية تساعدك على الإقرار والوعي بالمشكلة"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة التحضير والقبول",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/q_auto,f_auto/v1733760657/لمرحلة_التحضير_والقبول_m5z7jj.mov",
      description: "كلمات تحفيزية تدعمك في مرحلة التحضير والقبول"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة التخلص من السموم",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/q_auto,f_auto/v1733760658/مرحلة_التخلص_من_السموم_w9cjb1.mov",
      description: "كلمات تحفيزية تساعدك في مرحلة التخلص من السموم"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة التأهيل",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/q_auto,f_auto/v1733760754/مرحلة_التاهيل_e2zyvh.mov",
      description: "كلمات تحفيزية تدعمك في مرحلة التأهيل"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة التعافي المبكر",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/q_auto,f_auto/v1733760739/التعافي_المبكر_lqlf4r.mov",
      description: "كلمات تحفيزية تساعدك في مرحلة التعافي المبكر"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة التعافي المستمر",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/q_auto,f_auto/v1733760718/التعافي_المستمر_xdgygm.mov",
      description: "كلمات تحفيزية تدعمك في مرحلة التعافي المستمر"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة الوقاية من الانتكاسة",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/q_auto,f_auto/v1733760820/مرحلة_الوقاية_من_الانتكاسة_twnenc.mov",
      description: "كلمات تحفيزية تساعدك في الوقاية من الانتكاسة"
    },
    {
      title: "كلمات تحفيزية لدعم مرحلة اعادة بناء الحياة",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/q_auto,f_auto/v1733760813/مرحلة_اعادة_بناء_الحياة_xqfog2.mov",
      description: "كلمات تحفيزية تساعدك في مرحلة إعادة بناء الحياة"
    },
    {
      title: "كلمات تحفيزية لدعم جميع المراحل",
      url: "https://res.cloudinary.com/dzafrepxq/video/upload/q_auto,f_auto/v1733760568/كلمات_تحفيزية_لدعم_جميع_المراحل_rvq6kf.mov",
      description: "كلمات تحفيزية عامة تدعمك في جميع مراحل التعافي"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Links */}
        <div className="flex justify-between items-center mb-8">
          <Button
            as="a"
            href="/"
            leftIcon={<ChevronRightIcon />}
            colorScheme="teal"
            variant="ghost"
            size="lg"
          >
            العودة للرئيسية
          </Button>
        </div>

        {/* Assessment Link */}
        <Box
          p={6}
          mb={8}
          borderRadius="xl"
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="lg"
          border="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="lg" color="teal.600" textAlign="center">
              تعرف على مرحلتك من خلال هذا التقييم
            </Heading>
            <Text fontSize="lg" textAlign="center" color={useColorModeValue('gray.600', 'gray.300')}>
              قم بتقييم مرحلة التعافي الخاصة بك ثم اختر الكلمات المساندة المناسبة لك بحسب مرحلتك
            </Text>
            <Button
              as="a"
              href="/recovery-assessment"
              colorScheme="teal"
              size="lg"
              width="full"
              maxW="md"
              mx="auto"
              rightIcon={<ChevronRightIcon />}
            >
              تقييم مرحلة التعافي
            </Button>
          </VStack>
        </Box>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            كلمات عارف التحفيزية
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            كلمات تحفيزية من عارف لكل مرحلة من مراحل التعافي. استمع إلى هذه الكلمات في وقت هادئ، وكررها يوميا بصوت مسموع أو في داخلك لتثبيت معانيها في عقلك وقلبك حتى انتقالك للمرحلة التالية.
          </p>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-64 h-64 mx-auto mb-12"
          >
            <img 
              src="https://res.cloudinary.com/dzafrepxq/image/upload/v1733693205/positive_w_swo08v.png"
              alt="كلمات عارف التحفيزية"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-emerald-700">{video.title}</h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <video 
                  className="w-full rounded-lg"
                  controls
                  preload="none"
                  poster="https://res.cloudinary.com/dzafrepxq/image/upload/v1733693205/video_thumbnail_swo08v.jpg"
                >
                  <source src={video.url} type="video/mp4" />
                  <source src={video.url.replace('f_auto', 'f_webm')} type="video/webm" />
                  متصفحك لا يدعم تشغيل الفيديو. يمكنك <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">تحميل الفيديو</a> ومشاهدته باستخدام برنامج تشغيل الفيديو على جهازك.
                </video>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MotivationalWordsPage;
