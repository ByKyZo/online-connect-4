// TODO Faire la verification de victoire pour les 2 joueurs
// TODO Et verifier les conditions en diagonal (surtout vers la droite , bug ??)

export default class Game {
    grid: string[][] = [];
    currentPlayer = 'O';

    params = {
        xLength: 7,
        yLength: 6,
        cellSize: 70,
    };
    /***
     *
     * Constructor
     *
     */
    constructor({ game_grid }: any) {
        this.grid = game_grid;
    }
    /***
     *
     * Initialisation du jeu et création de la grille sous forme de tableau 2D
     *
     */
    static drawGrid(xLength: number, yLength: number) {
        const grid = [];
        for (let i = 0; i < yLength; i++) {
            const line = [];
            for (let j = 0; j < xLength; j++) {
                line.push('');
            }
            grid.push(line);
        }
        return grid;
    }
    /***
     *
     * Mets a jour le joueur courant
     *
     */
    updatePlayer() {
        this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
    }
    /***
     *
     * Retourne la class du joueur courant
     *
     */
    updatePlayerClass() {
        return this.currentPlayer === 'O' ? 'player1' : 'player2';
    }

    getValidPosition(col: number) {
        for (let i = this.params.yLength - 1; i >= 0; i--) {
            if (this.grid[i][col] === '') {
                return { row: i, col };
            }
        }
        return null;
    }

    public checkWin(playersChars: string[], xLength: number, yLength: number) {
        for (let k = 0; k < playersChars.length; k++) {
            for (let i = 0; i < yLength; i++) {
                for (let j = 0; j < xLength; j++) {
                    const verticalCoinPos = this.checkWinVertical(playersChars[k], i, j, yLength);
                    const horizontalCoinPos = this.checkWinHorizontal(playersChars[k], i, j);
                    const diagonalCoinPos = this.checkWinDiagonal(
                        playersChars[k],
                        i,
                        j,
                        xLength,
                        yLength
                    );

                    if (verticalCoinPos) return verticalCoinPos;
                    if (horizontalCoinPos) return horizontalCoinPos;
                    if (diagonalCoinPos) return diagonalCoinPos;
                }
            }
        }
        return null;
    }

    checkWinVertical(playerChar: any, row: number, col: number, yLength: number) {
        if (
            row < yLength - 3 &&
            this.grid[row][col] === playerChar &&
            this.grid[row + 1][col] === playerChar &&
            this.grid[row + 2][col] === playerChar &&
            this.grid[row + 3][col] === playerChar
        ) {
            console.log('WIN VERTICAL');
            return [
                { row, col },
                { row: row + 1, col: col },
                { row: row + 2, col: col },
                { row: row + 3, col: col },
            ];
        }
        return null;
    }

    checkWinHorizontal(playerChar: any, row: number, col: number) {
        if (
            this.grid[row][col] === playerChar &&
            this.grid[row][col + 1] === playerChar &&
            this.grid[row][col + 2] === playerChar &&
            this.grid[row][col + 3] === playerChar
        ) {
            console.log('WIN HORIZONTAL');
            return [
                { row, col },
                { row: row, col: col + 1 },
                { row: row, col: col + 2 },
                { row: row, col: col + 3 },
            ];
        }
        return null;
    }

    checkWinDiagonal(playerChar: any, row: number, col: number, xLength: number, yLength: number) {
        if (
            // Verifie en Diagonale vers la gauche
            row < yLength - 3 &&
            col < xLength - 3 &&
            this.grid[row][col] === playerChar &&
            this.grid[row + 1][col + 1] === playerChar &&
            this.grid[row + 2][col + 2] === playerChar &&
            this.grid[row + 3][col + 3] === playerChar
        ) {
            console.log('WIN DIAGONAL');
            return [
                { row, col },
                { row: row + 1, col: col + 1 },
                { row: row + 1, col: col + 1 },
                { row: row + 1, col: col + 1 },
            ];
        } else if (
            // Verifie en Diagonale vers la droite
            row >= 3 &&
            col < xLength - 3 &&
            this.grid[row][col] === playerChar &&
            this.grid[row - 1][col + 1] === playerChar &&
            this.grid[row - 2][col + 2] === playerChar &&
            this.grid[row - 3][col + 3] === playerChar
        ) {
            console.log('WIN DIAGONAL');
            return [
                { row, col },
                { row: row - 1, col: col + 1 },
                { row: row - 1, col: col + 1 },
                { row: row - 1, col: col + 1 },
            ];
        }
        return null;
    }
}
