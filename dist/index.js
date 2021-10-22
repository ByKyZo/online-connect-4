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
dotenv_1.default.config({ path: path.join(__dirname, '..', 'config', '.env.local') });
require("./database/database");
// TODO Changer la db utilisé
// TODO Changer la db utilisé
// TODO Changer la db utilisé
const ON_PRODUCTION = true;
const server = express_1.default();
const PORT = process.env.PORT || 8000;
// const PORT = 5000;
server.use(express_1.default.json());
// server.use(cors({ origin: process.env.ORIGIN, credentials: true }));
// server.use(cors({ origin: '*', credentials: true }));
server.use(express_1.default.urlencoded({ extended: true }));
// server.get('/toto', (req, res) => {
//     res.send({
//         toto: 'ezez',
//     });
// });
if (ON_PRODUCTION) {
    server.use(express_1.default.static(path.join(__dirname, '..', 'client', 'public')));
    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
    });
}
server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});
