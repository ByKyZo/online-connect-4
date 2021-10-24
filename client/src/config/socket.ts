import io from 'socket.io-client';

const ON_PRODUCTION = false;

let SOCKET_URL;

if (ON_PRODUCTION) {
    SOCKET_URL = '';
} else {
    SOCKET_URL = 'http://localhost:8000';
}

export default io(SOCKET_URL);
