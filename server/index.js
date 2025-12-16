const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// SETUP CORS FOR PRODUCTION
// In production, replace '*' with your actual Client URL for security
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    // 1. Get User's Public IP (for Auto-Discovery on same WiFi)
    let room = socket.handshake.headers['x-forwarded-for'] || socket.conn.remoteAddress;
    
    // Join the default IP-based room
    socket.join(room);
    
    // Send back user's own ID
    socket.emit('my-info', { id: socket.id, room });

    // Notify others in the same room
    socket.to(room).emit('user-found', { 
        id: socket.id, 
        name: `User ${socket.id.substr(0, 4)}` 
    });

    // 2. Handle Custom Room Joining (Code Mode)
    socket.on('join-room', (newRoomCode) => {
        socket.leave(room); // Leave old room (IP)
        room = newRoomCode; // Update current room
        socket.join(room);
        
        socket.emit('joined-room', room);
        
        // Notify others in the new room
        socket.to(room).emit('user-found', { 
            id: socket.id, 
            name: `User ${socket.id.substr(0, 4)}` 
        });
    });

    // 3. WebRTC Signaling Relay
    // This passes the "handshake" data between two browsers
    socket.on('signal', (data) => {
        io.to(data.target).emit('signal', {
            sender: socket.id,
            signal: data.signal
        });
    });

    // 4. Handle Disconnect
    socket.on('disconnect', () => {
        socket.to(room).emit('user-disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Signaling Server running on port ${PORT}`);
});
