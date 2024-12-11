import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, VStack, HStack, Button, useToast, IconButton, Flex, Badge, SimpleGrid, Container, Heading } from '@chakra-ui/react';
import { FaVolumeMute, FaVolumeUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Ball } from './Ball';
import { Basket } from './Basket';
import { Howl } from 'howler';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Category {
  id: string;
  title: string;
  questions: Question[];
}

interface GameProps {
  questionsData: Category[];
}

export const KnowledgeBallGame: React.FC<GameProps> = ({ questionsData }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [ballPosition, setBallPosition] = useState(1);
  const [isThrown, setIsThrown] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(questionsData[0].id);
  const [showCategories, setShowCategories] = useState<boolean>(true);
  const toast = useToast();

  // Sound Effects using Howler
  const soundEffects = useRef<{[key: string]: Howl}>({});
  const backgroundMusic = useRef<Howl | null>(null);

  // Initialize sounds
  useEffect(() => {
    // Initialize background music
    backgroundMusic.current = new Howl({
      src: ['/sounds/background.mp3'],
      loop: true,
      volume: isMuted ? 0 : 0.2,
      html5: true
    });

    // Initialize sound effects
    soundEffects.current = {
      success: new Howl({ src: ['/sounds/success.mp3'], volume: isMuted ? 0 : 0.5 }),
      failure: new Howl({ src: ['/sounds/failure.mp3'], volume: isMuted ? 0 : 0.5 }),
      throw: new Howl({ src: ['/sounds/throw.mp3'], volume: isMuted ? 0 : 0.5 }),
      move: new Howl({ src: ['/sounds/move.mp3'], volume: isMuted ? 0 : 0.5 })
    };

    // Start background music on first interaction
    const startMusic = () => {
      if (backgroundMusic.current && !isMuted) {
        backgroundMusic.current.play();
      }
      document.removeEventListener('click', startMusic);
    };
    document.addEventListener('click', startMusic);

    return () => {
      // Cleanup
      document.removeEventListener('click', startMusic);
      if (backgroundMusic.current) {
        backgroundMusic.current.stop();
      }
      Object.values(soundEffects.current).forEach(sound => sound.stop());
    };
  }, []);

  // Handle mute/unmute
  useEffect(() => {
    if (backgroundMusic.current) {
      backgroundMusic.current.volume(isMuted ? 0 : 0.2);
    }
    Object.values(soundEffects.current).forEach(sound => {
      sound.volume(isMuted ? 0 : 0.5);
    });
  }, [isMuted]);

  const handleMuteToggle = () => {
    setIsMuted(prev => !prev);
  };

  const moveBall = (direction: 'left' | 'right') => {
    if (!isThrown) {
      soundEffects.current.move?.play();
      if (direction === 'left' && ballPosition > 0) {
        setBallPosition(ballPosition - 1);
      } else if (direction === 'right' && ballPosition < 2) {
        setBallPosition(ballPosition + 1);
      }
    }
  };

  const handleThrow = () => {
    if (!isThrown) {
      setIsThrown(true);
      setShowResult(true);
      soundEffects.current.throw?.play();
      
      const currentCategoryQuestions = questionsData.find(cat => cat.id === selectedCategory)?.questions;
      if (currentCategoryQuestions && currentQuestion < currentCategoryQuestions.length) {
        const correctAnswer = currentCategoryQuestions[currentQuestion].correctAnswer;
        
        if (ballPosition === correctAnswer) {
          // Correct answer
          setTimeout(() => {
            soundEffects.current.success?.play();
          }, 500);
          
          setScore(score + (attempts === 0 ? 2 : 1));
          toast({
            title: 'إجابة صحيحة!',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setAttempts(0);
        } else {
          // Wrong answer
          setTimeout(() => {
            soundEffects.current.failure?.play();
          }, 500);

          if (attempts === 0) {
            toast({
              title: 'إجابة خاطئة',
              description: 'لديك محاولة أخرى، حاول مرة أخرى',
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
            setAttempts(1);
            setTimeout(() => {
              setIsThrown(false);
              setShowResult(false);
              setBallPosition(1);
            }, 1500);
            return;
          } else {
            toast({
              title: 'إجابة خاطئة',
              description: 'الإجابة الصحيحة موضحة باللون الأخضر',
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
            setAttempts(0);
          }
        }

        setTimeout(() => {
          if (currentQuestion < currentCategoryQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setIsThrown(false);
            setShowResult(false);
            setBallPosition(1);
          } else {
            toast({
              title: 'انتهت اللعبة!',
              description: `مجموع نقاطك: ${score}`,
              status: 'info',
              duration: 3000,
              isClosable: true,
            });
          }
        }, 2000);
      }
    }
  };

  const handleThrowComplete = () => {
    // Animation complete handler
  };

  const handleCollision = (index: number) => {
    // Handle collision with basket
  };

  const handleBackToGames = () => {
    if (backgroundMusic.current) {
      backgroundMusic.current.pause();
    }
    navigate('/games');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategories(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setIsThrown(false);
    setBallPosition(1);
  };

  const handleReturnToCategories = () => {
    setShowCategories(true);
  };

  // Get questions for selected category
  const categoryQuestions = questionsData.find(cat => cat.id === selectedCategory)?.questions || [];

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        {showCategories ? (
          // Category Selection Screen
          <VStack spacing={8}>
            <Heading size="lg" color="blue.600" textAlign="center" mb={8}>
              اختر القسم
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="100%">
              {questionsData.map((category) => (
                <Button
                  key={category.id}
                  height="100px"
                  onClick={() => handleCategorySelect(category.id)}
                  colorScheme="blue"
                  variant="outline"
                  fontSize="xl"
                  p={8}
                  _hover={{
                    bg: "blue.50",
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s"
                >
                  {category.title}
                </Button>
              ))}
            </SimpleGrid>
          </VStack>
        ) : (
          // Game Screen
          <Box>
            <HStack justify="space-between" mb={6}>
              <Button
                onClick={handleReturnToCategories}
                colorScheme="teal"
                variant="outline"
                rightIcon={<FaArrowLeft />}
              />
              <Heading size="md" color="blue.600">
                {questionsData.find(cat => cat.id === selectedCategory)?.title}
              </Heading>
              <Box width="40px" /> {/* Spacer for alignment */}
            </HStack>
            <Box position="relative" height="100vh" width="100%" overflow="hidden" bg="gray.50">
              {/* Navigation Controls */}
              <Box position="absolute" top={4} right={4} zIndex={10}>
                <IconButton
                  aria-label="Back to Games"
                  icon={<FaArrowLeft />}
                  onClick={handleBackToGames}
                  colorScheme="blue"
                  size="lg"
                  mr={2}
                />
              </Box>

              {/* Sound Controls */}
              <Box position="absolute" top={4} left={4} zIndex={10}>
                <IconButton
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  onClick={handleMuteToggle}
                  colorScheme="blue"
                  size="lg"
                />
              </Box>

              <Box
                position="relative"
                width="100%"
                height={{ base: "800px", md: "600px" }}
                bgImage="url('https://i.imgur.com/qEkAr3a.png')"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="cover"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  background: 'rgba(255, 255, 255, 0.85)',
                  zIndex: 0
                }}
              >
                <HStack position="absolute" top="4" right="4" spacing={4}>
                  <Button
                    onClick={handleBackToGames}
                    size="sm"
                    colorScheme="teal"
                    variant="outline"
                    rightIcon={<FaArrowLeft />}
                  />
                </HStack>
                {/* Question and Score Section */}
                <VStack spacing={{ base: 2, md: 4 }} position="relative" pt={{ base: 4, md: 8 }} width="100%" zIndex={1}>
                  {/* Score */}
                  <HStack spacing={{ base: 4, md: 8 }} justify="center">
                    <Badge 
                      colorScheme="green" 
                      fontSize={{ base: "md", md: "lg" }}
                      p={{ base: 1.5, md: 2 }}
                      borderRadius="md"
                    >
                      النقاط: {score}
                    </Badge>
                    <Badge 
                      colorScheme="blue" 
                      fontSize={{ base: "md", md: "lg" }}
                      p={{ base: 1.5, md: 2 }}
                      borderRadius="md"
                    >
                      السؤال: {currentQuestion + 1}/{categoryQuestions.length}
                    </Badge>
                  </HStack>

                  {/* Question */}
                  <Box 
                    width="100%" 
                    maxW="800px" 
                    mx="auto"
                    px={{ base: 2, md: 4 }}
                    mt={{ base: 2, md: 4 }}
                  >
                    <Text
                      fontSize={{ base: "lg", md: "2xl" }}
                      fontWeight="bold"
                      textAlign="center"
                      mb={{ base: 4, md: 8 }}
                      color="blue.700"
                      px={{ base: 2, md: 4 }}
                    >
                      {categoryQuestions[currentQuestion].question}
                    </Text>
                  </Box>

                  {/* Game Container */}
                  <Box 
                    width="100%"
                    maxW={{ base: "100%", md: "1200px" }}
                    mx="auto"
                    mt={{ base: 2, md: 4 }}
                    position="relative"
                    minH={{ base: "400px", md: "500px" }}
                  >
                    {/* Baskets and Answers Columns */}
                    <Flex 
                      justify="space-between" 
                      width="100%" 
                      px={{ base: 4, md: 8 }}
                      mb={{ base: "160px", md: "200px" }}
                    >
                      {[0, 1, 2].map((index) => (
                        <VStack 
                          key={index} 
                          spacing={{ base: 2, md: 3 }}
                          width={{ base: "30%", md: "30%" }}
                          alignItems="center"
                        >
                          {/* Basket */}
                          <Box 
                            width="100%"
                            height={{ base: "100px", md: "150px" }}
                            display="flex"
                            justifyContent="center"
                          >
                            <Basket
                              position={{ x: 50, y: 0 }}
                              isCorrect={index === categoryQuestions[currentQuestion].correctAnswer}
                              onCollision={() => handleCollision(index)}
                              showResult={showResult && (isThrown && (ballPosition === index || index === categoryQuestions[currentQuestion].correctAnswer))}
                            />
                          </Box>

                          {/* Answer */}
                          <Box
                            width="100%"
                            minH={{ base: "60px", md: "80px" }}
                            bg={showResult && ballPosition === index ? (
                              index === categoryQuestions[currentQuestion].correctAnswer 
                                ? "green.100"
                                : "red.100"
                            ) : "white"}
                            p={{ base: 2, md: 3 }}
                            borderRadius="md"
                            textAlign="center"
                            border="2px solid"
                            borderColor={showResult && ballPosition === index ? (
                              index === categoryQuestions[currentQuestion].correctAnswer 
                                ? "green.500"
                                : "red.500"
                            ) : "gray.200"}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text
                              color={showResult && ballPosition === index ? (
                                index === categoryQuestions[currentQuestion].correctAnswer 
                                  ? "green.700"
                                  : "red.700"
                              ) : "gray.800"}
                              fontSize={{ base: "sm", md: "md" }}
                              fontWeight="bold"
                            >
                              {categoryQuestions[currentQuestion].options[index]}
                            </Text>
                          </Box>
                        </VStack>
                      ))}
                    </Flex>

                    {/* Controls and Ball Container */}
                    <Box
                      position="absolute"
                      bottom={{ base: "20px", md: "40px" }}
                      left="0"
                      width="100%"
                    >
                      {/* Ball Container */}
                      <Box
                        position="relative"
                        width="100%"
                        maxWidth="600px"
                        margin="0 auto"
                        mb={{ base: 6, md: 8 }}
                        height={{ base: "60px", md: "80px" }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Ball
                          position={ballPosition}
                          isThrown={isThrown}
                          onThrowComplete={handleThrowComplete}
                        />
                      </Box>

                      {/* Controls */}
                      <Flex 
                        justify="center" 
                        width="100%"
                        px={4}
                      >
                        <HStack spacing={{ base: 4, md: 6 }}>
                          <IconButton
                            aria-label="Move Left"
                            icon={<FaArrowLeft />}
                            onClick={() => moveBall('left')}
                            isDisabled={isThrown || ballPosition === 0}
                            size={{ base: "lg", md: "lg" }}
                            colorScheme="blue"
                          />
                          <Button
                            colorScheme="blue"
                            onClick={handleThrow}
                            isDisabled={isThrown}
                            size={{ base: "lg", md: "lg" }}
                            px={{ base: 8, md: 10 }}
                            fontSize={{ base: "md", md: "lg" }}
                          >
                            رمي الكرة
                          </Button>
                          <IconButton
                            aria-label="Move Right"
                            icon={<FaArrowRight />}
                            onClick={() => moveBall('right')}
                            isDisabled={isThrown || ballPosition === 2}
                            size={{ base: "lg", md: "lg" }}
                            colorScheme="blue"
                          />
                        </HStack>
                      </Flex>
                    </Box>
                  </Box>
                </VStack>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};
