import React from "react";
import { socket } from "./socket";

// 1️⃣ Buat context untuk socket dan status koneksi
const SocketContext = React.createContext({
  socket,
  isConnected: false,
});

// 2️⃣ Provider component
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = React.useState(socket.connected);

  React.useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
      console.log("✅ WebSocket connected");
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("❌ WebSocket disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

// 3️⃣ Custom hook biar gampang dipakai di mana aja
export function useSocket() {
  return React.useContext(SocketContext);
}
