import { Server, Socket } from 'socket.io';
import PartyController from '../controllers/Party.controller';

export default (io: Server, socket: Socket) => {
    socket.on('create party', async ({ partyName, hostID, hostPseudo }) => {
        const party = await PartyController.createParty(partyName, hostID, hostPseudo);
        io.emit('create party', party);
    });
    socket.on('get parties', async () => {
        const parties = await PartyController.getParties();
        //! socket.emit pour une personne
        socket.emit('get parties', parties);
    });
    socket.on('join party', async ({ partyID, guestID, guestPseudo }) => {
        const party = await PartyController.joinParty(partyID, guestID, guestPseudo);
        io.emit('join party', party);
    });
    socket.on('play coin', async ({ partyID, coinPos }) => {
        const { oldPlayer, updatedPlayer, winner } = await PartyController.play(partyID, coinPos);

        io.emit('play coin', { partyID, coinPos, oldPlayer, updatedPlayer, winner });
    });
};
