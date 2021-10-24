import { Server, Socket } from 'socket.io';
import UserController from '../controllers/User.controller';

export default (io: Server, socket: Socket) => {
    socket.on('create session', async ({ pseudo }) => {
        const token = await UserController.createSession(pseudo);
        socket.emit('create session', { pseudo, token });
    });
    socket.on('load session', async ({ token }) => {
        const userLoaded = await UserController.loadSession(token);
        socket.emit('load session', { userLoaded });
    });
};
