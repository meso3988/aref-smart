import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Progress,
  Radio,
  RadioGroup,
  Input,
  Select,
  List,
  ListItem,
  Badge,
  HStack,
  Container,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaBrain, FaCheckCircle } from 'react-icons/fa';

// قائمة المواد الإدمانية وأعراضها
const substances = {
  "الكحول": {
    use: ["lossOfControl", "tolerance", "continuedUse", "legalProblems", "neglectResponsibilities"],
    withdrawal: ["tremors", "sweating", "anxiety", "seizures", "hallucinations"]
  },
  "المخدرات الأفيونية": {
    use: ["euphoria", "appetiteLoss", "behavioralChanges", "socialWithdrawal", "financialProblems"],
    withdrawal: ["musclePain", "insomnia", "nausea", "vomiting", "diarrhea"]
  },
  "الكوكايين": {
    use: ["increasedEnergy", "alertness", "elevatedSelfEsteem", "appetiteLoss", "aggression"],
    withdrawal: ["depression", "fatigue", "craving", "increasedAppetite"]
  },
  "البنزوديازيبينات": {
    use: ["anxietyRelief", "sedation", "impairedCoordination", "memoryProblems", "dependence"],
    withdrawal: ["severeAnxiety", "insomnia", "muscleTension", "seizures", "hallucinations"]
  },
  "التبغ (النيكوتين)": {
    use: ["craving", "increasedHeartRate", "irritability", "dependence", "appetiteIncrease"],
    withdrawal: ["irritability", "anxiety", "increasedAppetite", "difficultyConcentrating"]
  },
  "الماريجوانا": {
    use: ["relaxation", "alteredPerception", "appetiteIncrease", "socialWithdrawal", "memoryImpairment"],
    withdrawal: ["irritability", "insomnia", "anxiety", "depression"]
  },
  "الميثامفيتامين": {
    use: ["increasedEnergy", "euphoria", "aggression", "decreasedAppetite", "hyperfocus"],
    withdrawal: ["depression", "extremeFatigue", "anxiety", "paranoia"]
  },
  "الحرمان من النوم": {
    use: ["alertness", "impairedCognitiveFunction", "irritability", "fatigue"],
    withdrawal: ["extremeFatigue", "moodSwings", "difficultyConcentrating", "hallucinations"]
  },
  "الهيروين": {
    use: ["intenseEuphoria", "painRelief", "euphoria", "socialWithdrawal"],
    withdrawal: ["musclePain", "insomnia", "nausea", "vomiting", "diarrhea"]
  },
  "الاستيرويدات": {
    use: ["increasedMuscleMass", "enhancedPerformance", "euphoria", "aggression"],
    withdrawal: ["depression", "fatigue", "anxiety", "muscleLoss"]
  },
  "الإيكستاسي": {
    use: ["euphoria", "increasedEnergy", "enhancedSensoryPerception", "socialBonding"],
    withdrawal: ["depression", "fatigue", "anxiety", "insomnia"]
  },
  "البروبوفول": {
    use: ["sedation", "euphoria", "relaxation"],
    withdrawal: ["anxiety", "insomnia", "tremors"]
  },
  "الكانابينويدات الاصطناعية": {
    use: ["euphoria", "alteredPerception", "aggression"],
    withdrawal: ["anxiety", "irritability", "sleepDisturbances"]
  }
};

// قائمة الأعراض الكاملة
const symptomsList = [
  // أعراض التعاطي
  { id: "lossOfControl", question: "هل تواجه صعوبة في التحكم في تناول المادة الإدمانية؟" },
  { id: "tolerance", question: "هل تحتاج إلى كميات أكبر من المادة لتحقيق نفس التأثير؟" },
  { id: "continuedUse", question: "هل تستمر في استخدام المادة رغم المشاكل الصحية أو الاجتماعية؟" },
  { id: "legalProblems", question: "هل واجهت مشاكل قانونية بسبب استخدام المادة؟" },
  { id: "neglectResponsibilities", question: "هل أهملت مسؤولياتك مثل العمل أو الدراسة بسبب استخدام المادة؟" },
  { id: "euphoria", question: "هل تشعر بالنشوة أو السعادة المفرطة عند استخدام المادة؟" },
  { id: "appetiteLoss", question: "هل فقدت الشهية بسبب تعاطي المادة؟" },
  { id: "behavioralChanges", question: "هل لاحظت تغيرات في سلوكك نتيجة لتعاطي المادة؟" },
  { id: "socialWithdrawal", question: "هل بدأت تتجنب مواقف أو أشخاصاً كنت تستمتع معهم سابقاً؟" },
  { id: "financialProblems", question: "هل واجهت مشاكل مالية نتيجة تعاطي المادة؟" },
  { id: "increasedEnergy", question: "هل تشعر بزيادة في الطاقة بعد استخدام المادة؟" },
  { id: "alertness", question: "هل تشعر بزيادة في اليقظة والتركيز عند استخدام المادة؟" },
  { id: "elevatedSelfEsteem", question: "هل تشعر بزيادة في تقدير الذات عند استخدام المادة؟" },
  { id: "aggression", question: "هل تشعر بزيادة في العدوانية عند استخدام المادة؟" },
  { id: "anxietyRelief", question: "هل تستخدم المادة لتخفيف القلق أو التوتر؟" },
  { id: "sedation", question: "هل تشعر بالنعاس أو الهدوء عند استخدام المادة؟" },
  { id: "impairedCoordination", question: "هل تواجه صعوبة في التنسيق الحركي بعد استخدام المادة؟" },
  { id: "memoryProblems", question: "هل تواجه مشاكل في الذاكرة بسبب استخدام المادة؟" },
  { id: "dependence", question: "هل تشعر بأنك تعتمد على المادة؟" },
  { id: "craving", question: "هل تشعر برغبة شديدة في تناول المادة؟" },
  { id: "increasedAppetite", question: "هل تشعر بزيادة في الشهية عند التوقف عن استخدام المادة؟" },
  { id: "relaxation", question: "هل تشعر باسترخاء شديد عند استخدام المادة؟" },
  { id: "alteredPerception", question: "هل تلاحظ تغيرات في إدراكك للواقع عند استخدام المادة؟" },
  { id: "hyperfocus", question: "هل تشعر بتركيز مفرط على مهام معينة عند استخدام المادة؟" },
  { id: "decreasedAppetite", question: "هل تلاحظ انخفاضاً في شهيتك عند استخدام المادة؟" },
  { id: "enhancedPerformance", question: "هل تشعر بتحسن في أدائك البدني عند استخدام المادة؟" },
  { id: "increasedMuscleMass", question: "هل لاحظت زيادة في كتلة العضلات عند استخدام المادة؟" },
  { id: "enhancedSensoryPerception", question: "هل تشعر بتحسن في إدراكك الحسي عند استخدام المادة؟" },
  { id: "socialBonding", question: "هل تشعر بتحسن في التواصل الاجتماعي عند استخدام المادة؟" },
  
  // أعراض الانسحاب
  { id: "tremors", question: "هل تعاني من رعشة عند التوقف عن استخدام المادة؟" },
  { id: "sweating", question: "هل تعاني من تعرق شديد عند التوقف عن استخدام المادة؟" },
  { id: "anxiety", question: "هل تشعر بقلق شديد عند التوقف عن استخدام المادة؟" },
  { id: "seizures", question: "هل تعرضت لنوبات تشنج عند التوقف عن استخدام المادة؟" },
  { id: "hallucinations", question: "هل تعاني من هلوسات عند التوقف عن استخدام المادة؟" },
  { id: "musclePain", question: "هل تعاني من آلام عضلية عند التوقف عن استخدام المادة؟" },
  { id: "insomnia", question: "هل تعاني من أرق أو صعوبة في النوم عند التوقف عن استخدام المادة؟" },
  { id: "nausea", question: "هل تشعر بالغثيان عند التوقف عن استخدام المادة؟" },
  { id: "vomiting", question: "هل تعاني من القيء عند التوقف عن استخدام المادة؟" },
  { id: "diarrhea", question: "هل تعاني من إسهال عند التوقف عن استخدام المادة؟" },
  { id: "depression", question: "هل تشعر بالاكتئاب عند التوقف عن استخدام المادة؟" },
  { id: "fatigue", question: "هل تشعر بالتعب الشديد عند التوقف عن استخدام المادة؟" },
  { id: "extremeFatigue", question: "هل تعاني من إرهاق شديد عند التوقف عن استخدام المادة؟" },
  { id: "moodSwings", question: "هل تعاني من تقلبات مزاجية عند التوقف عن استخدام المادة؟" },
  { id: "muscleTension", question: "هل تشعر بتوتر عضلي عند التوقف عن استخدام المادة؟" },
  { id: "paranoia", question: "هل تشعر بالارتياب أو عدم الثقة بالآخرين عند التوقف عن استخدام المادة؟" },
  { id: "muscleLoss", question: "هل لاحظت فقداناً في كتلة العضلات عند التوقف عن استخدام المادة؟" },
  { id: "sleepDisturbances", question: "هل تعاني من اضطرابات في النوم عند التوقف عن استخدام المادة؟" }
];

const getArefRecommendations = (percentage: number): string[] => {
  if (percentage >= 70) {
    return [
      "يجب عليك طلب المساعدة المهنية بشكل عاجل.",
      "التواصل مع مختص في علاج الإدمان أمر ضروري في حالتك.",
      "لا تتردد في طلب الدعم من العائلة والأصدقاء.",
      "العلاج المبكر يزيد من فرص التعافي بشكل كبير.",
      "تذكر أن الإدمان مرض يمكن علاجه مع الدعم المناسب."
    ];
  } else if (percentage >= 40) {
    return [
      "ننصحك باستشارة مختص لتقييم حالتك بشكل دقيق.",
      "حاول تتبع أنماط استخدامك للمواد وتأثيرها على حياتك.",
      "ابحث عن بدائل صحية للتعامل مع الضغوط.",
      "تحدث مع شخص تثق به عن مخاوفك.",
      "فكر في الانضمام لمجموعات الدعم المتخصصة."
    ];
  } else {
    return [
      "حافظ على نمط حياة صحي ومتوازن.",
      "استمر في ممارسة الأنشطة الإيجابية.",
      "تعلم المزيد عن مخاطر الإدمان للوقاية.",
      "حافظ على علاقاتك الاجتماعية الداعمة.",
      "اهتم بصحتك النفسية والجسدية."
    ];
  }
};

const AddictionDiagnosticContent: React.FC = () => {
  const [step, setStep] = useState<'initial' | 'questions' | 'results'>('initial');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [personalInfo, setPersonalInfo] = useState({ age: '', gender: '' });
  
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  const handleStartDiagnostic = () => {
    if (!personalInfo.age || parseInt(personalInfo.age) < 1 || parseInt(personalInfo.age) > 120) {
      alert("يرجى إدخال عمر صحيح");
      return;
    }
    setStep('questions');
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [symptomsList[currentQuestion].id]: answer });
    if (currentQuestion < symptomsList.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const substanceScores: Record<string, { score: number; percentage: number }> = {};
    
    // حساب النتائج لكل مادة
    Object.entries(substances).forEach(([substance, { use, withdrawal }]) => {
      let matchedSymptoms = 0;
      let totalSymptoms = use.length + withdrawal.length;
      
      // حساب أعراض الاستخدام
      use.forEach(symptom => {
        if (answers[symptom] === 'yes') {
          matchedSymptoms++;
        }
      });
      
      // حساب أعراض الانسحاب
      withdrawal.forEach(symptom => {
        if (answers[symptom] === 'yes') {
          matchedSymptoms++;
        }
      });
      
      // حساب النسبة المئوية
      const percentage = (matchedSymptoms / totalSymptoms) * 100;
      
      if (percentage > 0) {
        substanceScores[substance] = {
          score: matchedSymptoms,
          percentage: percentage
        };
      }
    });

    // ترتيب النتائج تنازلياً
    const sortedResults = Object.entries(substanceScores)
      .sort(([, a], [, b]) => b.percentage - a.percentage)
      .map(([substance, { percentage }]): [string, number] => [substance, percentage]);

    setResults(sortedResults);
    setStep('results');
  };

  const [results, setResults] = useState<[string, number][]>([]);

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={6} align="stretch">
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <Heading size="lg" textAlign="center" mb={4}>
            التشخيص الاسترشادي للمواد الإدمانية المحتملة
          </Heading>
          
          {step === 'initial' && (
            <VStack spacing={4}>
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Text>
                  هذا التشخيص استرشادي فقط وليس بديلاً عن استشارة المختصين
                </Text>
              </Alert>
              
              <FormControl isRequired>
                <FormLabel>العمر</FormLabel>
                <Input
                  type="number"
                  value={personalInfo.age}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
                  placeholder="أدخل عمرك"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>الجنس</FormLabel>
                <Select
                  value={personalInfo.gender}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                >
                  <option value="">اختر الجنس</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                  <option value="other">آخر</option>
                </Select>
              </FormControl>
              
              <Button colorScheme="blue" onClick={handleStartDiagnostic} w="full">
                بدء التشخيص
              </Button>
            </VStack>
          )}

          {step === 'questions' && (
            <VStack spacing={4}>
              <Progress value={(currentQuestion / symptomsList.length) * 100} w="full" />
              <Text fontSize="lg" fontWeight="bold">
                السؤال {currentQuestion + 1} من {symptomsList.length}
              </Text>
              
              <Box p={4} borderWidth={1} borderRadius="md" w="full">
                <Text mb={4}>{symptomsList[currentQuestion].question}</Text>
                <RadioGroup 
                  value={answers[symptomsList[currentQuestion].id] || ''}
                  onChange={(value) => {
                    setAnswers(prev => ({
                      ...prev,
                      [symptomsList[currentQuestion].id]: value
                    }));
                  }}
                >
                  <Stack direction="column" spacing={4}>
                    <Radio value="yes">نعم</Radio>
                    <Radio value="no">لا</Radio>
                  </Stack>
                </RadioGroup>
                
                <HStack justify="space-between" mt={6}>
                  <Button
                    onClick={() => {
                      if (currentQuestion > 0) {
                        setCurrentQuestion(currentQuestion - 1);
                      }
                    }}
                    isDisabled={currentQuestion === 0}
                    colorScheme="gray"
                  >
                    السابق
                  </Button>
                  
                  <Button
                    onClick={() => {
                      if (answers[symptomsList[currentQuestion].id]) {
                        if (currentQuestion < symptomsList.length - 1) {
                          setCurrentQuestion(currentQuestion + 1);
                        } else {
                          calculateResults();
                        }
                      } else {
                        alert("الرجاء اختيار إجابة قبل الانتقال للسؤال التالي");
                      }
                    }}
                    colorScheme="blue"
                  >
                    {currentQuestion === symptomsList.length - 1 ? 'عرض النتائج' : 'التالي'}
                  </Button>
                </HStack>
              </Box>
            </VStack>
          )}

          {step === 'results' && (
            <VStack spacing={4} align="stretch">
              <Alert status="warning" borderRadius="md">
                <AlertIcon />
                <Text>
                  هذه النتائج استرشادية فقط. يرجى استشارة مختص للحصول على تشخيص دقيق.
                </Text>
              </Alert>

              <Text fontSize="lg" fontWeight="bold">
                نتائج التشخيص الاسترشادي:
              </Text>

              <List spacing={3}>
                {results.map(([substance, percentage], index) => (
                  <ListItem key={index} p={3} borderWidth={1} borderRadius="md">
                    <HStack justify="space-between">
                      <Text>{substance}</Text>
                      <Badge colorScheme={percentage > 70 ? 'red' : percentage > 40 ? 'yellow' : 'green'}>
                        {percentage.toFixed(1)}%
                      </Badge>
                    </HStack>
                  </ListItem>
                ))}
              </List>

              {results.length > 0 && (
                <Box mt={4} p={4} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="md">
                  <VStack align="stretch" spacing={3}>
                    <HStack>
                      <Text fontSize="lg" fontWeight="bold">توصيات عارف الذكي</Text>
                      <Icon as={FaBrain} color="blue.500" />
                    </HStack>
                    
                    <List spacing={2}>
                      {getArefRecommendations(results[0][1]).map((recommendation, index) => (
                        <ListItem key={index} display="flex" alignItems="center">
                          <Icon as={FaCheckCircle} color="green.500" mr={2} />
                          <Text>{recommendation}</Text>
                        </ListItem>
                      ))}
                    </List>

                    <Alert status="info" mt={2}>
                      <AlertIcon />
                      <Text>
                        تذكر دائماً: الشفاء ممكن مع الدعم المناسب والإرادة القوية
                      </Text>
                    </Alert>
                  </VStack>
                </Box>
              )}

              <Button
                colorScheme="blue"
                onClick={() => {
                  setStep('initial');
                  setCurrentQuestion(0);
                  setAnswers({});
                  setResults([]);
                }}
              >
                بدء تشخيص جديد
              </Button>
            </VStack>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default AddictionDiagnosticContent;
