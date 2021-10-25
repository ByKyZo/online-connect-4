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
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = __importStar(require("mongoose"));
const PartySchema = new Mongoose.Schema({
    name: {
        type: String,
        min: 4,
        max: 14,
        required: true,
    },
    hasBegun: {
        type: Boolean,
        default: false,
    },
    currentPlayer: {
        currentPlayerID: {
            type: String,
            required: true,
        },
        char: {
            type: String,
            required: true,
        },
        pseudo: {
            type: String,
            required: true,
        },
    },
    host: {
        hostID: {
            type: String,
            required: true,
        },
        pseudo: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            default: 0,
        },
        char: {
            type: String,
            required: true,
        },
    },
    guest: {
        guestID: {
            type: String,
        },
        pseudo: {
            type: String,
        },
        score: {
            type: Number,
            default: 0,
        },
        char: {
            type: String,
        },
    },
    game_grid: [],
});
exports.default = Mongoose.model('party', PartySchema);
