import { boardCols } from 'const';
import { atom } from 'recoil';
import { Board, NewPlayers, PlayerTurn } from 'types';

export const boardState = atom<Board>({
  key: 'boardState',
  default: Array(boardCols).fill([]),
});

export const playerState = atom<PlayerTurn>({
  key: 'playerState',
  default: 1,
});

export const newPlayerState = atom<NewPlayers[]>({
  key: 'newPlayers',
  default: [{
    name: '',
    color: '',
  }],
});

export const gameOverState = atom<boolean>({
  key: 'gameOverState',
  default: false,
});

export const playAgainstBOTState = atom<boolean>({
  key: 'playAgainstBOTState',
  default: false,
});



