import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface BreathingExerciseProps {
  inhale: number;
  hold?: number;
  exhale: number;
  holdAfterExhale?: number;
  isActive: boolean;
  backgroundColor: string;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({
  inhale,
  hold,
  exhale,
  holdAfterExhale,
  isActive,
  backgroundColor,
}) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdAfterExhale'>('inhale');
  const [count, setCount] = useState(inhale);

  useEffect(() => {
    if (!isActive) {
      setPhase('inhale');
      setCount(inhale);
      return;
    }

    const runCycle = async () => {
      // Inhale phase
      setPhase('inhale');
      for (let i = inhale; i > 0; i--) {
        setCount(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Hold phase
      if (hold) {
        setPhase('hold');
        for (let i = hold; i > 0; i--) {
          setCount(i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Exhale phase
      setPhase('exhale');
      for (let i = exhale; i > 0; i--) {
        setCount(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Hold after exhale phase
      if (holdAfterExhale) {
        setPhase('holdAfterExhale');
        for (let i = holdAfterExhale; i > 0; i--) {
          setCount(i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    };

    const interval = setInterval(
      runCycle,
      1000 * (inhale + (hold || 0) + exhale + (holdAfterExhale || 0))
    );

    runCycle();

    return () => clearInterval(interval);
  }, [isActive, inhale, hold, exhale, holdAfterExhale]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'شهيق';
      case 'hold':
      case 'holdAfterExhale':
        return 'امسك';
      case 'exhale':
        return 'زفير';
      default:
        return '';
    }
  };

  return (
    <Box position="relative" width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <AnimatePresence>
        {isActive ? (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: ['inhale', 'hold'].includes(phase) ? 1.8 : 1
              }}
              transition={{ 
                duration: phase === 'inhale' ? inhale : phase === 'exhale' ? exhale : 0.5,
                ease: "easeInOut"
              }}
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                backgroundColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0,0,0,0.1)'
              }}
            >
              <Box textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="gray.700">
                  {getPhaseText()}
                </Text>
                <Text fontSize="xl" mt={2} color="gray.700">
                  {count}
                </Text>
              </Box>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="inactive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Text
              fontSize="xl"
              color="gray.500"
              textAlign="center"
              pointerEvents="none"
            >
              اضغط زر البدء للبدء في التمرين
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default BreathingExercise;