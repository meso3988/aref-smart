import React from 'react';
import { VStack, HStack, IconButton, Button } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export interface GameControlsProps {
  onJump: () => void;
  onStart: () => void;
  gameStarted: boolean;
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onJump,
  onStart,
  gameStarted,
  onMove,
}) => {
  return (
    <VStack spacing={4} position="absolute" bottom="20px" right="20px">
      {!gameStarted ? (
        <Button colorScheme="green" onClick={onStart}>
          ابدأ اللعبة
        </Button>
      ) : (
        <>
          <Button colorScheme="blue" onClick={onJump}>
            اقفز
          </Button>
          <VStack spacing={2}>
            <IconButton
              aria-label="Move up"
              icon={<ChevronUpIcon />}
              onClick={() => onMove('up')}
            />
            <HStack spacing={2}>
              <IconButton
                aria-label="Move left"
                icon={<ChevronLeftIcon />}
                onClick={() => onMove('left')}
              />
              <IconButton
                aria-label="Move down"
                icon={<ChevronDownIcon />}
                onClick={() => onMove('down')}
              />
              <IconButton
                aria-label="Move right"
                icon={<ChevronRightIcon />}
                onClick={() => onMove('right')}
              />
            </HStack>
          </VStack>
        </>
      )}
    </VStack>
  );
};
