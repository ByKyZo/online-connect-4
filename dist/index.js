"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = __importStar(require("path"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
dotenv_1.default.config({ path: path.join(__dirname, '..', 'config', '.env.local') });
require("./database/database");
const party_socket_1 = __importDefault(require("./socketHandler/party.socket"));
const user_socket_1 = __importDefault(require("./socketHandler/user.socket"));
// TODO Automatiser Heroku
// TODO Mettre une NODE_ENV a development et NODE_ENV en production sur heroku (il le fait deja de base ?)
// TODO Changer la db utilisé
// TODO Changer la db utilisé
// TODO Changer la db utilisé
// TODO Apres entré du pseudo stocker generer un token qui va être stocké en base de données et associé au pseudo
// TODO Puis stocker le token dans les cookies
// TODO Tout ça en socket io
const server = express_1.default();
const httpServer = new http_1.default.Server(server);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true,
    },
});
const PORT = process.env.PORT || 8000;
server.use(express_1.default.json());
// server.use(cors({ origin: process.env.ORIGIN, credentials: true }));
server.use(cors_1.default({ origin: '*', credentials: true }));
server.use(express_1.default.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
    server.use(express_1.default.static(path.join(__dirname, '..', 'client', 'public')));
    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
    });
}
io.on('connection', (socket) => {
    party_socket_1.default(io, socket);
    user_socket_1.default(io, socket);
    socket.on('disconnect', () => {
        console.log('socket disconnected');
    });
    console.log('socket connected');
});
httpServer.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});
