import { createServer } from "http";
import { Server } from "socket.io";
import app = require("./app");

const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: "*", // later lock this to frontend domain
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Client must send userId after connection
  socket.on("register", (userId: string) => {
    socket.join(userId); // put this socket in a "room" = userId
    console.log(`User ${userId} registered for real-time notifications`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Expose io globally so routes can use it
export { io };

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});