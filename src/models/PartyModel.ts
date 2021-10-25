import * as Mongoose from 'mongoose';

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

export default Mongoose.model('party', PartySchema);
