import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
export const socket = io("http://localhost:2023", {
    autoConnect: false,
    transports: ['websocket'] 
 });