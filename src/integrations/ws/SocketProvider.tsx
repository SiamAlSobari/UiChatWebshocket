import React from "react";

type SocketContextType = {
  socket: WebSocket | null;
  isConnected: boolean;
};

const SocketContext = React.createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = React.useState(false);
  const [ws, setWs] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    // Buka koneksi baru
    const newSocket = new WebSocket("ws://localhost:4000/api/ws/connect");
    setWs(newSocket);

    newSocket.onopen = () => {
      setIsConnected(true);
      console.log("✅ WebSocket connected");
    };

    newSocket.onclose = () => {
      setIsConnected(false);
      console.log("❌ WebSocket disconnected");
    };

    newSocket.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
    };

    newSocket.onmessage = (event) => {
      console.log("📨 Message from server:", event.data);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: ws, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return React.useContext(SocketContext);
}
