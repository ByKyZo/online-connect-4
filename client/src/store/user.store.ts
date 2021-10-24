import Cookies from 'js-cookie';
import { Writable, writable, derived, get } from 'svelte/store';
import { ECookie } from '../typescript/enum';

class UserStore {
    public _id: Writable<string> = writable('');
    public pseudo: Writable<string> = writable('');
    public isConnected: Writable<boolean> = writable(false);
    public currentPartyID: Writable<string> = writable('');

    loadSession(_id: string, pseudo: string) {
        this._id.set(_id);
        this.pseudo.set(pseudo);
        this.isConnected.set(true);
    }

    createSession(_id: string, pseudo) {
        this.loadSession(_id, pseudo);
        if (!this.getCookieSession()) {
            this.setCookieSession(_id);
        }
    }

    removeCookieSession() {
        Cookies.remove(ECookie.SESSION);
    }

    setCookieSession(token: string) {
        Cookies.set(ECookie.SESSION, token);
    }

    getCookieSession() {
        return Cookies.get(ECookie.SESSION);
    }

    log() {
        console.log('********* USER ********');
        console.log(`ID : ${get(this._id)}`);
        console.log(`Pseudo : ${get(this.pseudo)}`);
        console.log(`isConnected : ${get(this.isConnected)}`);
        console.log('******* END USER ******');
    }
}

export const user = new UserStore();
