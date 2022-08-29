import { Box, Circle, Flex, Heading } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameOverState, newPlayerState, playerState } from 'state';

const GameProgress: FC = () => {
  const playerTurn = useRecoilValue(playerState);
  const player = useRecoilValue(newPlayerState);
  const gameOver = useRecoilValue(gameOverState);
  const [newPlayers, setNewPlayersState] = useRecoilState(newPlayerState);

  return (
    <Heading as="h3" size="lg">
      <Flex>
        <Circle
          m={1}
          mr={2}
          size="40px"
          boxShadow="base"
          bg={playerTurn === 1 ? newPlayers[0].color : newPlayers[1].color}
        />
        
        <h3>
          {' '}
          {gameOver
            ? `${
                playerTurn === 1 ? newPlayers[0].name : newPlayers[1].name
              } wins!`
            : `${
                playerTurn === 1 ? newPlayers[0].name : newPlayers[1].name
              }'s turn`}
        </h3>
      </Flex>
    </Heading>
  );
};

export default GameProgress;
