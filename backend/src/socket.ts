import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

const rooms = new Set();

export function initSockets(server: Server) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", ({ roomCode, studentId }) => {
      if (rooms.has(roomCode)) {
        console.log(`Student ${studentId} joined room ${roomCode}`);
        socket.join(roomCode);
        socket.to(roomCode).emit("roomJoined");
      } else {
        console.log(`Room ${roomCode} does not exist`);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  function createRoom(sessionId: string): string {
    if (!rooms.has(sessionId)) {
      rooms.add(sessionId);
      console.log(`Created room ${sessionId}`);
    }
    return sessionId;
  }

  function deleteRoom(sessionId: string): boolean {
    if (rooms.has(sessionId)) {
      rooms.delete(sessionId);
      console.log(`Deleted room ${sessionId}`);
      return true;
    } else {
      console.log(`Room ${sessionId} does not exist`);
      return false;
    }
  }

  function pushNotify(roomCode: string) {
    console.log("Sending push notification");
    io.to(roomCode).emit("pushNotification");
  }

  return {
    createRoom,
    deleteRoom,
    pushNotify,
  };
}
