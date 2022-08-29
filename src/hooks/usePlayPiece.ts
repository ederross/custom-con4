import { boardCols, boardRows, testDiagonal } from 'const';
import { useRecoilState } from 'recoil';
import { boardState, gameOverState, playerState } from 'state';

export const testWin = (arr: number[]): boolean =>
  /1{4}|2{4}/.test(arr.join(''));

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [playerTurn, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);

  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, playerTurn] : column
    );

    const row = newBoard[col].length - 1;

    const diagonalResult = testDiagonal(row, col, newBoard);

    if (
      testWin(newBoard[col]) || // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0)) || // Did win horizontally
      testWin(diagonalResult.leftDownToRightTop) ||  // Verifying from Left Down To Right Top win diagonally
      testWin(diagonalResult.leftTopToRightDown) // Verifying from Left Top To Right Down win diagonally

      // TODO: Did win diagonally right
    ) {
      setGameOver(true);
    } else {
      setPlayerTurn(playerTurn === 1 ? 2 : 1);
    }
    console.log(newBoard);
    setBoard(newBoard);
  };
};

export default usePlayPiece;
