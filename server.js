const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Initialize Socket.io
  const io = new Server(server);

  // Handle WebSocket connections
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle chat messages
    socket.on('chatMessage', async (message) => {
      try {
        // Client-side will use the REST API for chat responses
        // This is just for broadcasting and other socket-specific features
        socket.emit('serverStatus', { status: 'Message received' });
      } catch (error) {
        console.error('Error handling chat message:', error);
        socket.emit('error', { message: 'Error processing your message' });
      }
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}); 