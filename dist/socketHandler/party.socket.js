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
const Party_controller_1 = __importDefault(require("../controllers/Party.controller"));
exports.default = (io, socket) => {
    socket.on('create party', ({ partyName, hostID, hostPseudo }) => __awaiter(void 0, void 0, void 0, function* () {
        const party = yield Party_controller_1.default.createParty(partyName, hostID, hostPseudo);
        io.emit('create party', party);
    }));
    socket.on('get parties', () => __awaiter(void 0, void 0, void 0, function* () {
        const parties = yield Party_controller_1.default.getParties();
        //! socket.emit pour une personne
        socket.emit('get parties', parties);
    }));
    socket.on('join party', ({ partyID, guestID, guestPseudo }) => __awaiter(void 0, void 0, void 0, function* () {
        const party = yield Party_controller_1.default.joinParty(partyID, guestID, guestPseudo);
        io.emit('join party', party);
    }));
    socket.on('play coin', ({ partyID, coinPos }) => __awaiter(void 0, void 0, void 0, function* () {
        const { oldPlayer, updatedPlayer, winner } = yield Party_controller_1.default.play(partyID, coinPos);
        io.emit('play coin', { partyID, coinPos, oldPlayer, updatedPlayer, winner });
    }));
};
