import { Server as SocketIOServer } from "socket.io";

// This function gets the global io instance
export const getIO = (): SocketIOServer => {
  if (!global.io) {
    throw new Error("Socket.io not initialized");
  }
  return global.io;
};

// Helper functions
export const emitToAll = (event: string, data: any): void => {
  getIO().emit(event, data);
};

export const emitToRoom = (room: string, event: string, data: any): void => {
  getIO().to(room).emit(event, data);
};

export const emitToUser = (socketId: string, event: string, data: any): void => {
  getIO().to(socketId).emit(event, data);
};