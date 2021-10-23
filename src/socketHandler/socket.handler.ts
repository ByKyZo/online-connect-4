import { Server, Socket } from 'socket.io';

export default (io: Server, socket: Socket) => {
    socket.on('send pseudo', ({ pseudo }) => {
        console.log('send pseudopo ', pseudo);
        io.emit('send pseudo', { pseudo });
    });
};
