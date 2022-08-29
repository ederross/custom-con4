import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { boardState, gameOverState, playerState } from 'state';

const GameControls: FC = () => {
  const board = useRecoilValue(boardState);
  const resetBoard = useResetRecoilState(boardState);
  const resetPlayer = useResetRecoilState(playerState);
  const resetGameOver = useResetRecoilState(gameOverState);

  const handleReset = () => {
    resetBoard();
    resetPlayer();
    resetGameOver();
  };

  return (
    //TODO: If have more time: UX of buttons
    <>
      <Button
        onClick={handleReset}
        isDisabled={!board.some((col) => col.length)}
      >
        Reset
      </Button>
      <Button
        style={{ backgroundColor: '#E93636', color: '#FFF' }}
        onClick={() => window.location.reload()} //TODO: Performance optimization
      >
        Reload Players
      </Button>
    </>
  );
};

export default GameControls;
