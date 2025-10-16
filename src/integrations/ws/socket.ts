import { io } from "socket.io-client";

export const socket = io("http://localhost:4000/api/ws/connect", {
  transports: ["websocket"],
  autoConnect: false,
});
