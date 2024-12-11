import React from 'react';
import { Box, Image, Icon } from '@chakra-ui/react';
import { gameImages } from '../../../data/gameImages';

interface BasketProps {
  position: { x: number; y: number };
  isCorrect: boolean;
  onCollision: () => void;
  showResult: boolean;
}

export const Basket: React.FC<BasketProps> = ({ position, isCorrect, onCollision, showResult }) => {
  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      data-correct={isCorrect}
      onClick={onCollision}
      cursor="pointer"
      transition="all 0.3s ease"
    >
      <Image
        src={gameImages.basketball.hoop}
        alt="Basketball Hoop"
        width="100%"
        height="100%"
        objectFit="contain"
        draggable={false}
      />
      {showResult && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={2}
        >
          <Icon
            as={isCorrect ? gameImages.basketball.success : gameImages.basketball.fail}
            w={12}
            h={12}
            color={isCorrect ? "green.500" : "red.500"}
          />
        </Box>
      )}
    </Box>
  );
};
