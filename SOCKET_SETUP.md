# Setup Socket.io Server untuk Live Chat

## Instalasi

1. Buat folder baru untuk server (di luar folder `notary-id`):
```bash
mkdir notary-id-server
cd notary-id-server
npm init -y
```

2. Install dependencies:
```bash
npm install socket.io express cors
```

3. Buat file `server.js`:
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // URL frontend Anda
    methods: ["GET", "POST"]
  }
});

// Store active rooms
const rooms = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join consultation room
  socket.on('join-room', (data) => {
    const { consultationId, userId, userType } = data;
    const roomName = `consultation-${consultationId}`;
    
    socket.join(roomName);
    
    if (!rooms[roomName]) {
      rooms[roomName] = [];
    }
    
    if (!rooms[roomName].includes(userId)) {
      rooms[roomName].push(userId);
    }
    
    // Notify others in the room
    socket.to(roomName).emit('user-joined', { userId, userType });
    
    console.log(`User ${userId} joined room ${roomName}`);
  });

  // Handle messages
  socket.on('message', (data) => {
    const { consultationId, ...messageData } = data;
    const roomName = `consultation-${consultationId}`;
    
    // Broadcast message to all users in the room
    io.to(roomName).emit('message', messageData);
    
    console.log(`Message sent in room ${roomName}:`, messageData.text);
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    const { consultationId, userId, isTyping } = data;
    const roomName = `consultation-${consultationId}`;
    
    // Broadcast typing status to others in the room
    socket.to(roomName).emit('typing', { userId, isTyping });
  });

  // Handle file uploads (you'll need to implement file storage)
  socket.on('file-upload', (data) => {
    const { consultationId, file, ...messageData } = data;
    const roomName = `consultation-${consultationId}`;
    
    // TODO: Upload file to storage (Firebase Storage, AWS S3, etc.)
    // For now, just broadcast the file info
    io.to(roomName).emit('message', {
      ...messageData,
      files: [file]
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove user from rooms
    Object.keys(rooms).forEach(roomName => {
      rooms[roomName] = rooms[roomName].filter(id => id !== socket.id);
    });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
```

4. Update `package.json` untuk menambahkan script:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

5. Jalankan server:
```bash
npm start
```

## Update Frontend

Pastikan URL Socket.io di `ConsultationDetailPage.jsx` sesuai dengan server Anda:

```javascript
const newSocket = io('http://localhost:3001', {
  query: {
    consultationId,
    userId: user.id,
    userType: 'user'
  }
});
```

## Catatan

- Untuk production, ganti `http://localhost:3001` dengan URL server production Anda
- Implementasikan file storage (Firebase Storage, AWS S3, atau yang lainnya) untuk upload file
- Tambahkan autentikasi untuk memastikan hanya user yang berwenang yang bisa join room
- Simpan pesan ke database untuk history chat
