import { Heading } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameOverState, newPlayerState, playerState } from 'state';

const GameProgress: FC = () => {
  const playerTurn = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const [newPlayers, setNewPlayersState] = useRecoilState(newPlayerState);

  useEffect(() => {
    setNewPlayersState([
      { name: 'Eder', color: 'orange' },
      { name: 'Thais', color: 'purple' },
    ]);
  }, []);

  return (
    <Heading as="h3" size="lg">
      {gameOver
        ? `${playerTurn === 1 ? newPlayers[0].name : newPlayers[1].name} wins!`
        : `${playerTurn === 1 ? newPlayers[0].name : newPlayers[1].name}'s turn`}
    </Heading>
  );
};

export default GameProgress;
