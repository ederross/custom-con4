import { Board } from 'types';

export const boardCols = 7;
export const boardRows = 6;

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
