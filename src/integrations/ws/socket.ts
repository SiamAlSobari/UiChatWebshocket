// socket.ts
export const socket = new WebSocket("ws://localhost:4000/api/ws/connect");

export function sendMessage(msg: string) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(msg);
  } else {
    console.warn("⚠️ WebSocket belum siap.");
  }
}
