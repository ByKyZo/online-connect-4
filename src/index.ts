import express from 'express';
import dotenv from 'dotenv';
import * as path from 'path';
import cors from 'cors';
dotenv.config({ path: path.join(__dirname, '..', 'config', '.env.local') });
import './database/database';

// TODO Changer la db utilisé
// TODO Changer la db utilisé
// TODO Changer la db utilisé

const ON_PRODUCTION = true;

const server = express();
const PORT = process.env.PORT || 8000;
// const PORT = 5000;

server.use(express.json());
// server.use(cors({ origin: process.env.ORIGIN, credentials: true }));
// server.use(cors({ origin: '*', credentials: true }));
server.use(express.urlencoded({ extended: true }));

// server.get('/toto', (req, res) => {
//     res.send({
//         toto: 'ezez',
//     });
// });

if (ON_PRODUCTION) {
    server.use(express.static(path.join(__dirname, '..', 'client', 'public')));
    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
    });
}

server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});
