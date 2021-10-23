"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io, socket) => {
    socket.on('send pseudo', ({ pseudo }) => {
        console.log('send pseudopo ', pseudo);
        io.emit('send pseudo', { pseudo });
    });
};
