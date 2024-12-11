/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid
} from '@chakra-ui/react';
import { breathingExercises, backgroundThemes, soundThemes } from '../data/breathingExercises';
import BreathingExercise from '../components/relax/BreathingExercise';

// Define the type for the keys of backgroundThemes
type BackgroundThemeKeys = 'ocean' | 'night-sky' | 'mountains' | 'waterfall';

// Define the type for the keys of soundThemes
type SoundKeys = 'ocean' | 'birds' | 'rain' | 'piano' | 'nature';

export default function BreathingExercisesPage() {
  const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0]);
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(1);

  useEffect(() => {
    if (!isActive || !soundEnabled) {
      Object.values(soundThemes).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      return;
    }

    const currentSound = soundThemes[selectedExercise.soundTheme as SoundKeys];
    if (currentSound) {
      currentSound.loop = true;
      currentSound.volume = 0.3;
      currentSound.play().catch(console.error);
    }

    return () => {
      Object.values(soundThemes).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, [isActive, soundEnabled, selectedExercise.soundTheme]);

  useEffect(() => {
    if (!isActive) {
      setCurrentCycle(1);
      return;
    }

    const cycleDuration = 1000 * (
      selectedExercise.inhale + 
      (selectedExercise.hold || 0) + 
      selectedExercise.exhale + 
      (selectedExercise.holdAfterExhale || 0)
    );

    const interval = setInterval(() => {
      setCurrentCycle(cycle => {
        if (cycle >= selectedExercise.cycles) {
          setIsActive(false);
          return 1;
        }
        return cycle + 1;
      });
    }, cycleDuration);

    return () => clearInterval(interval);
  }, [isActive, selectedExercise]);

  return (
    <Box 
      minH="100vh"
      bgImage={backgroundThemes[selectedExercise.backgroundTheme as BackgroundThemeKeys]}
      bgSize="cover"
      bgPosition="center"
      transition="background-image 0.5s ease-in-out"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.400"
        backdropFilter="blur(2px)"
      />

      <Container maxW="container.xl" py={8} position="relative">
        <Stack spacing="8">
          <Heading 
            textAlign="center"
            size="xl"
            color="white"
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          >
            تمارين تنفس عارف
          </Heading>

          <Text 
            fontSize="lg"
            textAlign="center"
            color="white"
            textShadow="1px 1px 2px rgba(0,0,0,0.5)"
          >
            اختر نمط التنفس المناسب لحالتك النفسية
          </Text>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            {breathingExercises.map(exercise => (
              <Button
                key={exercise.id}
                colorScheme={selectedExercise.id === exercise.id ? 'teal' : 'gray'}
                onClick={() => {
                  setSelectedExercise(exercise);
                  setIsActive(false);
                }}
                height="80px"
                whiteSpace="normal"
                _hover={{ transform: 'scale(1.05)', transition: 'all 0.2s' }}
              >
                <Stack spacing={1}>
                  <Text fontWeight="bold">{exercise.name}</Text>
                  <Text fontSize="sm">{exercise.description}</Text>
                </Stack>
              </Button>
            ))}
          </SimpleGrid>

          <Box height="500px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" position="relative">
            <Box
              position="absolute"
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                bg="whiteAlpha.200"
                backdropFilter="blur(8px)"
                borderRadius="full"
                p={8}
                boxShadow="xl"
              >
                <BreathingExercise
                  inhale={selectedExercise.inhale}
                  hold={selectedExercise.hold}
                  exhale={selectedExercise.exhale}
                  holdAfterExhale={selectedExercise.holdAfterExhale}
                  isActive={isActive}
                  backgroundColor={selectedExercise.backgroundColor}
                />
              </Box>
            </Box>
          </Box>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={8}
            justify="center"
            align="center"
            bg="whiteAlpha.200"
            backdropFilter="blur(8px)"
            p={4}
            borderRadius="xl"
          >
            <Button
              colorScheme={isActive ? 'red' : 'teal'}
              size="lg"
              onClick={() => setIsActive(!isActive)}
              width="200px"
              _hover={{ transform: 'scale(1.05)' }}
            >
              {isActive ? 'إيقاف' : 'ابدأ'}
            </Button>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
              <FormControl display="flex" alignItems="center">
                <Switch
                  id="sound"
                  isChecked={soundEnabled}
                  onChange={e => setSoundEnabled(e.target.checked)}
                  colorScheme="teal"
                  size="lg"
                />
                <FormLabel htmlFor="sound" mb="0" mr={4} cursor="pointer" color="white">
                  الأصوات
                </FormLabel>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <Switch
                  id="voice"
                  isChecked={voiceEnabled}
                  onChange={e => setVoiceEnabled(e.target.checked)}
                  colorScheme="teal"
                  size="lg"
                />
                <FormLabel htmlFor="voice" mb="0" mr={4} cursor="pointer" color="white">
                  الإرشاد الصوتي
                </FormLabel>
              </FormControl>
            </Stack>

            {isActive && (
              <Text fontSize="lg" color="white" textShadow="1px 1px 2px rgba(0,0,0,0.5)">
                الدورة {currentCycle} من {selectedExercise.cycles}
              </Text>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}