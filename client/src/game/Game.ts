/// TODO Stocker les params du jeu  : xLength / yLength

import socket from '../config/socket';
import { party } from '../store/party.store';
import { user } from '../store/user.store';
import { get } from 'svelte/store';

export default class Game {
    private params = {
        yLength: 6,
        xLength: 7,
    };
    private cells: HTMLDivElement[] = [];
    private htmlGridElement: HTMLElement;
    private game_grid: string[][];

    constructor(htmlGridElement: HTMLElement, game_grid: string[][]) {
        this.htmlGridElement = htmlGridElement;
        this.game_grid = game_grid;
    }

    public drawGrid() {
        this.htmlGridElement.innerHTML = '';
        this.game_grid.forEach((row, rowIndex) => {
            const line = document.createElement('div');
            line.classList.add('row');

            row.forEach((cell, cellIndex) => {
                const cellEl = document.createElement('div');
                cellEl.dataset.col = cellIndex.toString();
                cellEl.dataset.row = rowIndex.toString();
                cellEl.style.width = `${60}px`;
                cellEl.style.height = `${60}px`;
                cellEl.classList.add('cell');
                this.cells.push(cellEl);
                line.appendChild(cellEl);
            });

            this.htmlGridElement.appendChild(line);
        });
    }

    getHTMLCell(row: number, col: number) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    getValidPosition(col: number) {
        for (let i = this.params.yLength - 1; i >= 0; i--) {
            if (this.game_grid[i][col] === '') {
                return { row: i, col };
            }
        }
        return null;
    }

    updatePlayerClass() {
        return get(party.currentPlayer).char === 'O' ? 'player1' : 'player2';
    }

    clearPlaceholder() {
        const placeholders = document.querySelectorAll('.placeholder');
        placeholders.forEach((p) => p.remove());
    }

    isCurrentPlayer() {
        return get(user._id) !== get(party.currentPlayer).currentPlayerID;
    }

    updatePlaceholder(colParam: number) {
        if (this.isCurrentPlayer()) {
            this.clearPlaceholder();
            return;
        }

        this.clearPlaceholder();

        const pos = this.getValidPosition(colParam);

        if (!pos) return;

        const coin = document.createElement('div');

        coin.classList.add(this.updatePlayerClass(), 'token', 'placeholder');
        this.getHTMLCell(pos.row, pos.col).appendChild(coin);
    }

    emitPlay(colParam) {
        if (this.isCurrentPlayer()) {
            return;
        }

        const pos = this.getValidPosition(colParam);

        if (!pos) return;

        socket.emit('play coin', {
            partyID: get(party._id),
            coinPos: { row: pos.row, col: pos.col },
        });
    }

    onPlay(row: number, col: number) {
        this.updatePlaceholder(col);
        const coin = document.createElement('div');
        coin.classList.add(this.updatePlayerClass(), 'token');
        this.getHTMLCell(row, col).appendChild(coin);
    }

    eventListenerHandler() {
        this.cells.forEach((cell) => {
            const col = parseInt(cell.dataset.col);
            cell.addEventListener('mouseenter', () => this.updatePlaceholder(col));
            // cell.addEventListener('click', () => this.play(col));
            cell.addEventListener('click', () => this.emitPlay(col));
            cell.addEventListener('mouseleave', () => this.clearPlaceholder());
        });
    }
}
