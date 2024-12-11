import React from 'react';
import { Box } from '@chakra-ui/react';

interface Position {
  x: number;
  y: number;
}

export interface GamePlayerProps {
  position: Position;
  isJumping: boolean;
}

export const GamePlayer: React.FC<GamePlayerProps> = ({ position, isJumping }) => {
  return (
    <Box
      position="absolute"
      left={`${position.x}px`}
      bottom={`${position.y}px`}
      width="20px"
      height="20px"
      bg={isJumping ? 'green.500' : 'blue.500'}
      borderRadius="full"
    />
  );
};
