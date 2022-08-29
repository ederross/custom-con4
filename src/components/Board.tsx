import { Circle, Flex } from '@chakra-ui/react';
import { boardRows, testDiagonal } from 'const';
import { usePlayPiece } from 'hooks';
import { testWin } from 'hooks/usePlayPiece';
import { FC, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  boardState,
  gameOverState,
  newPlayerState,
  playAgainstBOTState,
  playerState,
} from 'state';
import { PlayerTurn } from 'types';
import ModalCompetitors from './ModalCompetitors';

const padCol = (col: number[]): number[] =>
  col.join('').padEnd(boardRows, '0').split('').map(Number);

const Board: FC = () => {
  const play = usePlayPiece();
  const newPlayer = useRecoilValue(newPlayerState);
  const [board, setBoard] = useRecoilState(boardState);
  const [playerTurn, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);
  const playAgainstBOT = useRecoilValue(playAgainstBOTState);

  const playerColor: Record<PlayerTurn, string> = {
    1: newPlayer[0]?.color,
    2: newPlayer[1]?.color,
  };

  useEffect(() => {
    
    //  TODO: make AI intelligence
    //  TODO: remove redundancy

    if (playerTurn === 2 && playAgainstBOT) {
      // Random BOT play colum.
      var randomNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

      // Prevent adding a piece when the game is over
      if (gameOver) {
        return;
      }

      // Prevent adding a piece when the column is full
      if (board[randomNumber].length === boardRows) {
        return;
      }

      // Play piece (non mutating)
      const newBoard = board.map((column, i) =>
        i === randomNumber ? [...column, playerTurn] : column
      );

      const row = newBoard[randomNumber]?.length - 1;

      const diagonalResult = testDiagonal(row, randomNumber, newBoard);

      if (
        testWin(newBoard[randomNumber]) || // Did win vertically
        testWin(newBoard.map((col) => col[row] || 0)) || // Did win horizontally
        testWin(diagonalResult.leftDownToRightTop) ||  // Verifying from Left Down To Right Top win diagonally
        testWin(diagonalResult.leftTopToRightDown) // Verifying from Left Top To Right Down win diagonally
      ) {
        console.log('GAME OVER');
        setGameOver(true);
      } else {
        setPlayerTurn(1);
      }
      setBoard(newBoard);
    }
  }, [playerTurn]);

  return (
    <>
      <Flex justify="center">
        {board.map((col, i) => (
          <Flex
            key={i}
            role="group"
            onClick={() => play(i)}
            flexDirection="column-reverse"
            cursor={gameOver ? 'auto' : 'pointer'}
          >
            {padCol(col).map((p, j) => {
              return (
                <Circle
                  m={1}
                  size="40px"
                  key={`${i}-${j}`}
                  bg={playerColor[p as PlayerTurn] || 'gray.300'}
                />
              );
            })}

            <Circle
              m={1}
              size="40px"
              boxShadow="base"
              visibility="hidden"
              bg={playerTurn === 1 ? newPlayer[0].color : newPlayer[1].color}
              _groupHover={{
                visibility: gameOver ? 'hidden' : 'visible',
              }}
            />
          </Flex>
        ))}
      </Flex>

      <ModalCompetitors />
    </>
  );
};

export default Board;
