import React, { useEffect } from 'react';
import { Box, Image, useBreakpointValue } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { gameImages } from '../../../data/gameImages';

interface BallProps {
  position: number;
  isThrown: boolean;
  onThrowComplete: () => void;
}

export const Ball: React.FC<BallProps> = ({ position, isThrown, onThrowComplete }) => {
  const controls = useAnimation();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Handle throwing animation
  useEffect(() => {
    if (isThrown) {
      controls.start({
        y: isMobile ? -250 : -300,
        transition: {
          duration: 0.6,
          type: "spring",
          stiffness: 150,
          damping: 15
        }
      }).then(onThrowComplete);
    } else {
      controls.start({
        y: 0,
        transition: {
          duration: 0.3
        }
      });
    }
  }, [isThrown, isMobile, controls, onThrowComplete]);

  // Handle horizontal movement
  useEffect(() => {
    const positions = isMobile ? {
      0: -80,  // Left position for mobile
      1: 0,    // Center position
      2: 80    // Right position for mobile
    } : {
      0: -120, // Left position for desktop
      1: 0,    // Center position
      2: 120   // Right position for desktop
    };

    controls.start({
      x: positions[position as keyof typeof positions],
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    });
  }, [position, controls, isMobile]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: isMobile ? '40px' : '50px',
        height: isMobile ? '40px' : '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        transformOrigin: 'center'
      }}
      initial={{ x: 0, y: 0 }}
      animate={controls}
    >
      <Image
        src={gameImages.basketball.ball}
        alt="Basketball"
        width="100%"
        height="100%"
        draggable={false}
      />
    </motion.div>
  );
};
