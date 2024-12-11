import React from 'react';
import { Box } from '@chakra-ui/react';

interface Position {
  x: number;
  y: number;
}

export interface GameObstacleProps {
  position: Position;
  type: string;
}

export const GameObstacle: React.FC<GameObstacleProps> = ({ position, type }) => {
  return (
    <Box
      position="absolute"
      left={`${position.x}px`}
      bottom={`${position.y}px`}
      width="20px"
      height="20px"
      bg="red.500"
      borderRadius="md"
    >
      {type}
    </Box>
  );
};
