import React, { useState } from 'react';
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
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon
} from '@chakra-ui/react';
import { ChevronRightIcon, CheckIcon, InfoIcon } from '@chakra-ui/icons';
import { FaArrowLeft, FaPills, FaBrain, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { disorders, symptomsList, substances } from '../data/diagnosticData';
import AddictionDiagnosticContent from './AddictionDiagnosticPage';

interface SymptomData {
  id: string;
  question: string;
}

interface DisorderData {
  [key: string]: string[];
}

interface Disorders {
  [key: string]: DisorderData;
}

interface SubstanceData {
  name: string;
  symptoms: SymptomData[];
  withdrawalSymptoms?: SymptomData[];
}

interface Substances {
  [key: string]: {
    name: string;
    symptoms: SymptomData[];
  };
}

interface Answer {
  [key: string]: any;
}

interface DisorderResult {
  disorder: string;
  score: number;
  percentage: number;
}

interface Results {
  [key: string]: {
    score?: number;
    percentage: number;
  };
}

const DiagnosticGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('purple.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const [selectedTab, setSelectedTab] = useState<number>(0);

  // حالة التشخيص الاسترشادي للمادة الإدمانية
  const [addictionStep, setAddictionStep] = useState<'initial' | 'questions' | 'results'>('initial');
  const [addictionCurrentQuestion, setAddictionCurrentQuestion] = useState(0);
  const [addictionAnswers, setAddictionAnswers] = useState<Answer>({});
  const [addictionUserInfo, setAddictionUserInfo] = useState({
    age: '',
    gender: '',
  });

  // حالة التشخيص الاسترشادي للاضطرابات النفسية
  const [mentalStep, setMentalStep] = useState<'initial' | 'questions' | 'results'>('initial');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const [userInfo, setUserInfo] = useState({
    age: '',
    gender: '',
    substanceUse: '',
    duration: '',
  });

  const [results, setResults] = useState<DisorderResult[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer>({});

  // دوال التشخيص الاسترشادي للمادة الإدمانية
  const handleAddictionStart = () => {
    if (!addictionUserInfo.age || !addictionUserInfo.gender) {
      toast({
        title: "معلومات مطلوبة",
        description: "الرجاء إكمال جميع المعلومات المطلوبة",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setAddictionStep('questions');
  };

  const calculateAddictionResults = () => {
    const results: Results = {};
    
    Object.entries(substances).forEach(([substance, data]: [string, SubstanceData]) => {
      let matchedSymptoms = 0;
      let totalSymptoms = data.symptoms.length + (data.withdrawalSymptoms?.length || 0);
      
      data.symptoms.forEach((symptom: SymptomData) => {
        if (addictionAnswers[symptom.id]) matchedSymptoms++;
      });
      
      if (data.withdrawalSymptoms) {
        data.withdrawalSymptoms.forEach((symptom: SymptomData) => {
          if (addictionAnswers[symptom.id]) matchedSymptoms++;
        });
      }
      
      const percentage = Math.min(Math.round((matchedSymptoms / totalSymptoms) * 100), 80);
      results[substance] = { percentage };
    });
    
    return Object.entries(results).sort((a, b) => b[1].percentage - a[1].percentage);
  };

  const handleAddictionAnswer = (answer: boolean) => {
    setAddictionAnswers((prev: Answer) => ({
      ...prev,
      [symptomsList[addictionCurrentQuestion].id]: answer
    }));

    if (addictionCurrentQuestion < symptomsList.length - 1) {
      setAddictionCurrentQuestion(prev => prev + 1);
    } else {
      setAddictionStep('results');
    }
  };

  // دوال التشخيص الاسترشادي للاضطرابات النفسية (بقاء نفس الدوال السابقة)
  const handleSectionSelect = (section: 'mental' | 'addiction') => {
    // setSelectedSection(section);
    // Reset states when switching sections
    if (section === 'mental') {
      setMentalStep('initial');
      setCurrentQuestion(0);
      setAnswers({});
      setUserInfo({
        age: '',
        gender: '',
        substanceUse: '',
        duration: '',
      });
    } else {
      setAddictionStep('initial');
      setAddictionCurrentQuestion(0);
      setAddictionAnswers({});
      setAddictionUserInfo({
        age: '',
        gender: '',
      });
    }
  };

  const handleMentalStart = () => {
    if (!userInfo.age || !userInfo.gender || !userInfo.substanceUse || !userInfo.duration) {
      toast({
        title: "معلومات مطلوبة",
        description: "الرجاء إكمال جميع المعلومات المطلوبة",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setMentalStep('questions');
  };

  const calculateMentalResults = () => {
    const disorderScores: { [key: string]: { score: number; percentage: number } } = {};
    
    // تحقق من وجود الإجابات
    if (!answers || Object.keys(answers).length === 0) {
      console.error('No answers available');
      return;
    }

    try {
      // حساب النتائج لكل اضطراب
      Object.entries(disorders).forEach(([disorder, symptoms]) => {
        let score = 0;
        symptoms.forEach(symptom => {
          if (answers[symptom]) {
            score++;
          }
        });
        
        // حساب النسبة المئوية مع تطبيق معامل تصحيح
        // نضرب في 0.8 لجعل الحد الأقصى 80% حتى في حالة الإجابة بنعم على كل الأسئلة
        const percentage = Math.round((score / symptoms.length) * 80);
        disorderScores[disorder] = { score, percentage };
      });

      // تحويل النتائج إلى مصفوفة وترتيبها حسب النسبة المئوية
      const sortedResults = Object.entries(disorderScores)
        .map(([disorder, { score, percentage }]) => ({ 
          disorder, 
          score,
          percentage 
        }))
        .filter(result => result.percentage >= 20) // نعرض فقط النتائج التي تتجاوز 20%
        .sort((a, b) => b.percentage - a.percentage);

      // تحديث النتائج والانتقال لصفحة النتائج
      setAnswers(sortedResults);
      setMentalStep('results');
    } catch (error) {
      console.error('Error calculating results:', error);
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء حساب النتائج. يرجى المحاولة مرة أخرى.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleMentalAnswer = (answer: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [symptomsList[currentQuestion].id]: answer
    }));

    if (currentQuestion < symptomsList.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateMentalResults();
    }
  };

  const handleSymptomAnswer = (symptomId: string, value: boolean) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [symptomId]: value
    }));
  };

  const calculateResults = () => {
    const results: DisorderResult[] = [];
    
    Object.entries(disorders).forEach(([disorder, symptomIds]) => {
      let score = 0;
      symptomIds.forEach(symptomId => {
        if (answers[symptomId]) score++;
      });
      
      const percentage = Math.round((score / symptomIds.length) * 100);
      results.push({ disorder, score, percentage });
    });
    
    return results.sort((a, b) => b.percentage - a.percentage);
  };

  const getAIAnalysis = (results: DisorderResult[]) => {
    if (results.length === 0) {
      return {
        analysis: "بناءً على إجاباتك، لم يتم تحديد أي اضطرابات نفسية واضحة. ومع ذلك، إذا كنت تشعر بالقلق بشأن صحتك النفسية، فننصحك باستشارة مختص.",
        recommendations: [
          "الحفاظ على نمط حياة صحي",
          "ممارسة الرياضة بانتظام",
          "الحصول على قسط كافٍ من النوم",
          "التواصل مع الأصدقاء والعائلة"
        ]
      };
    }

    const primaryDisorder = results[0];
    let analysis = `بناءً على إجاباتك، تظهر مؤشرات تتوافق مع أعراض ${primaryDisorder.disorder} بنسبة احتمالية ${primaryDisorder.percentage}%. `;
    
    if (results.length > 1) {
      analysis += `كما تظهر بعض المؤشرات المتوافقة مع أعراض ${results[1].disorder} بنسبة ${results[1].percentage}%. `;
    }
    
    analysis += "يرجى الملاحظة أن هذا التقييم استرشادي فقط ولا يمكن اعتباره تشخيصاً نهائياً. للحصول على تشخيص دقيق وخطة علاج مناسبة، يجب استشارة مختص في الصحة النفسية.";

    const generalRecommendations = [
      "استشارة مختص في الصحة النفسية للحصول على تشخيص دقيق",
      "الالتزام بالعلاج والمتابعة المنتظمة",
      "بناء نظام دعم اجتماعي قوي",
      "تعلم تقنيات إدارة التوتر والقلق",
      "الاهتمام بالصحة البدنية والنفسية"
    ];

    const specificRecommendations: { [key: string]: string[] } = {
      "الاكتئاب": [
        "ممارسة الرياضة بانتظام",
        "الحفاظ على روتين يومي منتظم",
        "التواصل مع الأصدقاء والعائلة",
        "تجنب العزلة الاجتماعية"
      ],
      "القلق العام": [
        "تعلم تقنيات التنفس والاسترخاء",
        "ممارسة التأمل",
        "تجنب المواقف المثيرة للقلق تدريجياً",
        "الحد من تناول الكافيين"
      ]
    };

    const recommendations = [
      ...generalRecommendations,
      ...(specificRecommendations[primaryDisorder.disorder] || [])
    ];

    return { analysis, recommendations };
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box 
            textAlign="center" 
            p={6} 
            bg={useColorModeValue('teal.50', 'teal.900')}
            borderRadius="xl" 
            boxShadow="xl"
            transform="auto"
            _hover={{ transform: 'auto-gpu scale(1.01)' }}
            transition="all 0.2s ease-in-out"
            borderWidth="1px"
            borderColor={useColorModeValue('teal.200', 'teal.700')}
          >
            <Heading as="h1" size="xl" mb={4} bgGradient="linear(to-r, teal.400, purple.500)" bgClip="text">
              التشخيص الاسترشادي مع عارف
            </Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
              تشخيص شامل للمواد الإدمانية والاضطرابات النفسية المصاحبة
            </Text>
          </Box>

          <Alert 
            status="info" 
            borderRadius="xl" 
            boxShadow="md"
            bg={useColorModeValue('blue.50', 'blue.900')}
            _hover={{ boxShadow: "lg" }}
            transition="all 0.2s ease-in-out"
          >
            <AlertIcon />
            <Box>
              <AlertTitle mb={1} fontSize="lg" color={useColorModeValue('blue.700', 'blue.200')}>ملاحظة هامة</AlertTitle>
              <AlertDescription color={useColorModeValue('blue.600', 'blue.300')}>
                هذا التشخيص استرشادي فقط ولا يغني عن استشارة المختص النفسي أو الطبيب.
              </AlertDescription>
            </Box>
          </Alert>

          <Stack direction={{ base: "column", md: "row" }} spacing={6} justify="center" mb={8}>
            <Button
              size="lg"
              bg={selectedTab === 0 ? useColorModeValue('teal.500', 'teal.200') : useColorModeValue('gray.100', 'gray.700')}
              color={selectedTab === 0 ? 'white' : useColorModeValue('gray.800', 'white')}
              onClick={() => setSelectedTab(0)}
              flex="1"
              maxW="500px"
              h="100px"
              position="relative"
              overflow="hidden"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
                bg: selectedTab === 0 ? useColorModeValue('teal.600', 'teal.300') : useColorModeValue('gray.200', 'gray.600')
              }}
              _active={{
                transform: "translateY(0)",
                bg: selectedTab === 0 ? useColorModeValue('teal.700', 'teal.400') : useColorModeValue('gray.300', 'gray.500')
              }}
              transition="all 0.2s"
              borderRadius="xl"
              boxShadow="md"
            >
              <VStack>
                <Icon as={FaPills} w={8} h={8} mb={2} />
                <Text fontSize="lg" fontWeight="bold">
                  التشخيص الاسترشادي للمواد الإدمانية المحتملة
                </Text>
              </VStack>
              {selectedTab === 0 && (
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  h="4px"
                  bg={useColorModeValue('teal.600', 'teal.200')}
                  borderRadius="full"
                />
              )}
            </Button>

            <Button
              size="lg"
              bg={selectedTab === 1 ? useColorModeValue('purple.500', 'purple.200') : useColorModeValue('gray.100', 'gray.700')}
              color={selectedTab === 1 ? 'white' : useColorModeValue('gray.800', 'white')}
              onClick={() => setSelectedTab(1)}
              flex="1"
              maxW="500px"
              h="100px"
              position="relative"
              overflow="hidden"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
                bg: selectedTab === 1 ? useColorModeValue('purple.600', 'purple.300') : useColorModeValue('gray.200', 'gray.600')
              }}
              _active={{
                transform: "translateY(0)",
                bg: selectedTab === 1 ? useColorModeValue('purple.700', 'purple.400') : useColorModeValue('gray.300', 'gray.500')
              }}
              transition="all 0.2s"
              borderRadius="xl"
              boxShadow="md"
            >
              <VStack>
                <Icon as={FaBrain} w={8} h={8} mb={2} />
                <Text fontSize="lg" fontWeight="bold">
                  التشخيص الاسترشادي للاضطرابات النفسية المصاحبة
                </Text>
              </VStack>
              {selectedTab === 1 && (
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  h="4px"
                  bg={useColorModeValue('purple.600', 'purple.200')}
                  borderRadius="full"
                />
              )}
            </Button>
          </Stack>

          <Box>
            {selectedTab === 0 ? (
              <Box 
                p={6} 
                borderRadius="xl" 
                boxShadow="lg"
                bg={useColorModeValue('white', 'gray.800')}
                borderWidth="1px"
                borderColor={useColorModeValue('teal.100', 'teal.700')}
                _hover={{ boxShadow: "xl" }}
                transition="all 0.2s ease-in-out"
              >
                <AddictionDiagnosticContent />
              </Box>
            ) : (
              <Box 
                p={6} 
                borderRadius="xl" 
                boxShadow="lg"
                bg={useColorModeValue('white', 'gray.800')}
                borderWidth="1px"
                borderColor={useColorModeValue('purple.100', 'purple.700')}
                _hover={{ boxShadow: "xl" }}
                transition="all 0.2s ease-in-out"
              >
                {mentalStep === 'initial' && (
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <FormLabel>العمر</FormLabel>
                      <Input
                        type="number"
                        value={userInfo.age}
                        onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
                        placeholder="أدخل عمرك"
                        min={1}
                        max={120}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>الجنس</FormLabel>
                      <Select
                        value={userInfo.gender}
                        onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                        placeholder="اختر الجنس"
                      >
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>استخدام المادة الإدمانية</FormLabel>
                      <Select
                        value={userInfo.substanceUse}
                        onChange={(e) => setUserInfo({ ...userInfo, substanceUse: e.target.value })}
                        placeholder="اختر نوع المادة الإدمانية"
                      >
                        {Object.keys(substances).map(substance => (
                          <option key={substance} value={substance}>{substances[substance].name}</option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>مدة الاستخدام</FormLabel>
                      <Input
                        type="number"
                        value={userInfo.duration}
                        onChange={(e) => setUserInfo({ ...userInfo, duration: e.target.value })}
                        placeholder="أدخل مدة استخدامك للمادة الإدمانية بالشهور"
                        min={1}
                      />
                    </FormControl>

                    <Button
                      colorScheme="blue"
                      size="lg"
                      onClick={handleMentalStart}
                      rightIcon={<ChevronRightIcon />}
                    >
                      بدء التشخيص
                    </Button>
                  </VStack>
                )}

                {mentalStep === 'questions' && (
                  <VStack spacing={6}>
                    <Progress
                      value={(currentQuestion / symptomsList.length) * 100}
                      w="100%"
                      colorScheme="blue"
                      borderRadius="full"
                    />
                    
                    <Text fontSize="md" color="gray.500">
                      السؤال {currentQuestion + 1} من {symptomsList.length}
                    </Text>

                    <Box p={6} borderWidth={1} borderRadius="lg" w="100%">
                      <Text fontSize="lg" mb={8} textAlign="center">
                        {symptomsList[currentQuestion].question}
                      </Text>

                      <Stack direction="row" spacing={4} justify="center">
                        <Button
                          colorScheme="green"
                          size="lg"
                          onClick={() => handleMentalAnswer(true)}
                          leftIcon={<CheckIcon />}
                        >
                          نعم
                        </Button>
                        <Button
                          colorScheme="red"
                          size="lg"
                          onClick={() => handleMentalAnswer(false)}
                          leftIcon={<InfoIcon />}
                        >
                          لا
                        </Button>
                      </Stack>
                    </Box>
                  </VStack>
                )}

                {mentalStep === 'results' && (
                  <VStack spacing={6} align="stretch">
                    <Heading size="lg" mb={4} textAlign="center">
                      نتائج التشخيص الاسترشادي للاضطرابات النفسية المصاحبة
                    </Heading>

                    {results.map(result => (
                      <Box key={result.disorder} p={4} borderWidth={1} borderRadius="md">
                        <VStack align="stretch" spacing={4}>
                          <Flex justify="space-between" align="center">
                            <Heading size="md">{result.disorder}</Heading>
                            <Badge
                              colorScheme={
                                result.percentage >= 60
                                  ? 'red'
                                  : result.percentage >= 40
                                  ? 'yellow'
                                  : 'green'
                              }
                              fontSize="md"
                              p={2}
                              borderRadius="full"
                            >
                              {result.percentage}%
                            </Badge>
                          </Flex>

                          <Progress
                            value={result.percentage}
                            colorScheme={
                              result.percentage >= 60
                                ? 'red'
                                : result.percentage >= 40
                                ? 'yellow'
                                : 'green'
                            }
                            size="sm"
                            borderRadius="full"
                          />
                        </VStack>
                      </Box>
                    ))}

                    <Alert status="warning" mt={4}>
                      <AlertIcon />
                      <Box>
                        <AlertTitle>تنبيه هام</AlertTitle>
                        <AlertDescription>
                          هذا التشخيص استرشادي فقط ولا يغني عن استشارة المختص. يرجى مراجعة مختص في الصحة النفسية للحصول على تشخيص دقيق وخطة علاج مناسبة.
                        </AlertDescription>
                      </Box>
                    </Alert>

                    <Button
                      colorScheme="blue"
                      size="lg"
                      onClick={() => {
                        setMentalStep('initial');
                        setCurrentQuestion(0);
                        setAnswers({});
                        setUserInfo({
                          age: '',
                          gender: '',
                          substanceUse: '',
                          duration: '',
                        });
                      }}
                      leftIcon={<FaArrowLeft />}
                    >
                      بدء تشخيص جديد
                    </Button>
                  </VStack>
                )}
              </Box>
            )}
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
};

export default DiagnosticGuidePage;
