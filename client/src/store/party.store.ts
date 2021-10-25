import { Writable, writable, get } from 'svelte/store';
import socket from '../config/socket';
import { user } from './user.store';

interface IHost {
    hostID: string;
    pseudo: string;
    score: number;
    char: string;
}

interface IGuest {
    guestID: string;
    pseudo: string;
    score: number;
    char: string;
}

interface ICurrentPlayer {
    currentPlayerID: string;
    char: string;
}
interface ICurrentPlayer {
    currentPlayerID: string;
    char: string;
}

class PartyStore {
    public _id: Writable<string> = writable('');
    public hasBegun: Writable<boolean> = writable(false);
    public name: Writable<string> = writable('');
    public host: Writable<IHost> = writable();
    public guest: Writable<IGuest> = writable();
    public currentPlayer: Writable<ICurrentPlayer> = writable();
    public game_grid: Writable<string[][]> = writable();
    public userWantRestart: Writable<string[]> = writable([]);
    public isExisting: Writable<boolean> = writable(false);

    public createParty(partyID, partyName) {
        this._id.set(partyID);
    }

    public startParty(partyID, partyName, host, guest, currentPlayer, game_grid) {
        this._id.set(partyID);
        this.name.set(partyName);
        this.host.set({
            hostID: host.hostID,
            pseudo: host.pseudo,
            char: host.char,
            score: 0,
        });
        this.guest.set({
            guestID: guest.guestID,
            pseudo: guest.pseudo,
            char: guest.char,
            score: 0,
        });
        this.currentPlayer.set({
            currentPlayerID: currentPlayer.currentPlayerID,
            char: currentPlayer.char,
        });
        this.game_grid.set(game_grid);
        this.isExisting.set(true);
        console.log('PARTY START');
    }

    public wantRestartParty(userID: string) {
        if (get(this.userWantRestart).length >= 2) return;
        this.userWantRestart.update((old) => {
            return [...old, userID];
        });
        console.log('USER WANT RESTART', get(this.userWantRestart));
    }

    public isPartyRestart() {
        return get(this.userWantRestart).length >= 2;
    }

    public emitRestarParty() {
        if (this.isPartyRestart()) {
            socket.emit('restart party', { partyID: get(this._id) });
        }
    }

    public onRestarParty(new_game_grid: string[][]) {
        this.userWantRestart.set([]);
        this.game_grid.set(new_game_grid);
    }

    public removeParty(partyID) {
        socket.emit('remove party', partyID);
    }

    public incScore(player: Writable<IHost | IGuest>) {
        player.update((p) => {
            p.score++;
            return p;
        });
    }

    public log() {
        console.log('********** PARTY *********');
        console.log(`partyID : ${get(this._id)}`);
        console.log(`name : ${get(this.name)}`);
        console.log(`host : `, get(this.host));
        console.log(`guest : `, get(this.guest));
        console.log(`currentPlayer : `, get(this.currentPlayer));
        console.log('******* END PARTY *******');
    }
}

export const party = new PartyStore();
