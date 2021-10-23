import express from 'express';
import dotenv from 'dotenv';
import * as path from 'path';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
dotenv.config({ path: path.join(__dirname, '..', 'config', '.env.local') });
import './database/database';
import socketHandler from './socketHandler/socket.handler';

// TODO Automatiser Heroku
// TODO Mettre une NODE_ENV a development et NODE_ENV en production sur heroku (il le fait deja de base ?)
// TODO Changer la db utilisé
// TODO Changer la db utilisé
// TODO Changer la db utilisé

// TODO Apres entré du pseudo stocker generer un token qui va être stocké en base de données et associé au pseudo
// TODO Puis stocker le token dans les cookies
// TODO Tout ça en socket io

const server = express();
const httpServer = new http.Server(server);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true,
    },
});

const PORT = process.env.PORT || 8000;

server.use(express.json());
// server.use(cors({ origin: process.env.ORIGIN, credentials: true }));
server.use(cors({ origin: '*', credentials: true }));
server.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    server.use(express.static(path.join(__dirname, '..', 'client', 'public')));
    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
    });
}

io.on('connection', (socket) => {
    socketHandler(io, socket);
    socket.on('disconnect', () => {
        console.log('socket disconnected');
    });
    console.log('socket connected');
});

httpServer.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});
