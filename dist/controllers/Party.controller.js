"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("../game/Game"));
const PartyModel_1 = __importDefault(require("../models/PartyModel"));
class PartyController {
    static createParty(partyName, hostID, hostPseudo) {
        return __awaiter(this, void 0, void 0, function* () {
            const game_grid = Game_1.default.drawGrid(7, 6);
            const party = yield PartyModel_1.default.create({
                name: partyName,
                currentPlayer: {
                    currentPlayerID: hostID,
                    char: 'O',
                    pseudo: hostPseudo,
                },
                host: {
                    hostID,
                    pseudo: hostPseudo,
                    char: 'O',
                },
                game_grid,
            });
            return party;
        });
    }
    static getParties() {
        return __awaiter(this, void 0, void 0, function* () {
            const parties = yield PartyModel_1.default.find();
            return parties;
        });
    }
    static joinParty(partyID, guestID, guestPseudo) {
        return __awaiter(this, void 0, void 0, function* () {
            const party = yield PartyModel_1.default.findByIdAndUpdate(partyID, {
                $set: {
                    guest: { guestID: guestID, score: 0, pseudo: guestPseudo, char: 'X' },
                    // hasBegun: true,
                },
            }, {
                new: true,
            });
            return party;
        });
    }
    static updateCurrentPlayer(party) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentPlayer = {
                currentPlayerID: '',
                char: '',
                pseudo: '',
            };
            if (party.currentPlayer.currentPlayerID === party.host.hostID) {
                currentPlayer.currentPlayerID = party.guest.guestID;
                currentPlayer.char = party.guest.char;
                currentPlayer.pseudo = party.guest.pseudo;
            }
            else {
                currentPlayer.currentPlayerID = party.host.hostID;
                currentPlayer.char = party.host.char;
                currentPlayer.pseudo = party.host.pseudo;
            }
            return yield PartyModel_1.default.findByIdAndUpdate(party._id, {
                $set: { currentPlayer },
            }, {
                new: true,
            });
        });
    }
    static play(partyID, coinPos) {
        return __awaiter(this, void 0, void 0, function* () {
            const party = yield PartyModel_1.default.findById(partyID);
            const game_grid = [...party.game_grid];
            game_grid[coinPos.row][coinPos.col] = party.currentPlayer.char;
            yield PartyModel_1.default.findByIdAndUpdate(partyID, {
                $set: { game_grid },
            });
            const game = new Game_1.default({ game_grid });
            const oldPlayer = party.currentPlayer;
            const updatedParty = yield this.updateCurrentPlayer(party);
            const updatedPlayer = updatedParty.currentPlayer;
            const winnerCoinPos = game.checkWin(oldPlayer.char, 7, 6);
            let winner = null;
            if (winnerCoinPos) {
                winner = {
                    winnerID: oldPlayer.currentPlayerID,
                    winnerPseudo: oldPlayer.pseudo,
                    coinPos: winnerCoinPos,
                };
            }
            return {
                oldPlayer,
                updatedPlayer,
                winner,
            };
        });
    }
}
exports.default = PartyController;
