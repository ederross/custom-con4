import { boardCols, boardRows } from 'const';
import { useRecoilState } from 'recoil';
import { boardState, gameOverState, playerState } from 'state';
import { Board } from 'types';


export const testDiagonal = (row: number, col: number, newBoard: Board) => {
  const boardMaxCol = boardCols - 1; // 6
  const boardMaxRow = boardRows - 1; // 5

  // space verify
  const tryLeftDown = row + 1 > col ? col : row; // quantity max left down direction size by the current played location
  const tryLeftTop = boardMaxRow - row < col ? boardMaxRow - row : col; //  quantity max left top direction size by the current played location
  const tryRightDown = boardMaxCol - col < row ? boardMaxCol - col : row; //  quantity max right down direction size by the current played location
  const tryRightTop =
    boardMaxCol - col > boardMaxRow - row
      ? boardMaxRow - row
      : boardMaxCol - col; // quantity max right top direction size by the current played location

  const calcDiagonal = (x: 'left' | 'right', y: 'top' | 'down') => {
    const selectTryCalc =
      x === 'left' && y === 'top'
        ? tryLeftTop
        : x === 'right' && y === 'top'
        ? tryRightTop
        : x === 'left' && y === 'down'
        ? tryLeftDown
        : tryRightDown;

    return [...Array(selectTryCalc)].map((_, i) => {
      const colCalc = x === 'left' ? col - i - 1 : col + i + 1; //left = "- i" | right = "+ i";
      const rowCalc = y === 'down' ? row - i - 1 : row + i + 1; //bottom = "- i" | top = "+ i";
      const result = newBoard[colCalc][rowCalc];
      return result || 0;
    });
  };

  const leftDownToRightTop = [
    ...calcDiagonal('left', 'down'),
    newBoard[col][row],
    ...calcDiagonal('right', 'top'),
  ];

  const leftTopToRightDown = [
    ...calcDiagonal('left', 'top'),
    newBoard[col][row],
    ...calcDiagonal('right', 'down'),
  ];

  return {
    leftDownToRightTop: leftDownToRightTop,
    leftTopToRightDown: leftTopToRightDown,
  };
};


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
