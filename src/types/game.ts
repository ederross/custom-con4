export type NewPlayers = {
    name: string;
    color: string;
}
export type PlayerTurn = 1 | 2;
export type Board = PlayerTurn[][];

export type playAgainstBOT = boolean;