import Game from '../game/Game';
import PartyModel from '../models/PartyModel';

export default class PartyController {
    static async createParty(partyName: string, hostID: string, hostPseudo: string) {
        const game_grid = Game.drawGrid(7, 6);
        const party = await PartyModel.create({
            name: partyName,
            currentPlayer: {
                currentPlayerID: hostID,
                char: 'O',
            },
            host: {
                hostID,
                pseudo: hostPseudo,
                char: 'O',
            },
            game_grid,
        });

        return party;
    }

    static async getParties() {
        const parties = await PartyModel.find();

        return parties;
    }

    static async joinParty(partyID: string, guestID: string, guestPseudo: string) {
        const party = await PartyModel.findByIdAndUpdate(
            partyID,
            {
                $set: {
                    guest: { guestID: guestID, score: 0, pseudo: guestPseudo, char: 'X' },
                    // hasBegun: true,
                },
            },
            {
                new: true,
            }
        );
        return party;
    }

    static async updateCurrentPlayer(party: any) {
        let currentPlayer = {
            currentPlayerID: '',
            char: '',
        };

        if (party.currentPlayer.currentPlayerID === party.host.hostID) {
            currentPlayer.currentPlayerID = party.guest.guestID;
            currentPlayer.char = party.guest.char;
        } else {
            currentPlayer.currentPlayerID = party.host.hostID;
            currentPlayer.char = party.host.char;
        }

        return await PartyModel.findByIdAndUpdate(
            party._id,
            {
                $set: { currentPlayer },
            },
            {
                new: true,
            }
        );
    }

    static async play(partyID: string, coinPos: { row: number; col: number }) {
        const party = await PartyModel.findById(partyID);

        const game_grid = [...party.game_grid];

        game_grid[coinPos.row][coinPos.col] = party.currentPlayer.char;

        await PartyModel.findByIdAndUpdate(partyID, {
            $set: { game_grid },
        });

        const game = new Game({ game_grid });

        const oldPlayer = party.currentPlayer;
        const updatedParty = await this.updateCurrentPlayer(party);
        const updatedPlayer = updatedParty.currentPlayer;

        const winnerCoinPos = game.checkWin(oldPlayer.char, 7, 6);

        let winner = null;

        if (winnerCoinPos) {
            winner = {
                winnerID: oldPlayer.currentPlayerID,
                coinPos: winnerCoinPos,
            };
        }

        return {
            oldPlayer,
            updatedPlayer,
            winner,
        };
    }
}