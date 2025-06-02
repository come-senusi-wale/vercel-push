"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitToUser = exports.emitToRoom = exports.emitToAll = exports.getIO = void 0;
// This function gets the global io instance
const getIO = () => {
    if (!global.io) {
        throw new Error("Socket.io not initialized");
    }
    return global.io;
};
exports.getIO = getIO;
// Helper functions
const emitToAll = (event, data) => {
    (0, exports.getIO)().emit(event, data);
};
exports.emitToAll = emitToAll;
const emitToRoom = (room, event, data) => {
    (0, exports.getIO)().to(room).emit(event, data);
};
exports.emitToRoom = emitToRoom;
const emitToUser = (socketId, event, data) => {
    (0, exports.getIO)().to(socketId).emit(event, data);
};
exports.emitToUser = emitToUser;
