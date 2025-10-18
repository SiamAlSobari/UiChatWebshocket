import React from "react";

type Message = {
  from: string;
  to: string;
  text: string;
};

type SocketContextType = {
  socket: WebSocket | null;
  isConnected: boolean;
  sendMessage: (to: string, text: string) => void;
  messages: Message[];
};

const SocketContext = React.createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  sendMessage: () => {},
  messages: [],
});

export function SocketProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string; // string ID user login
}) {
  const [isConnected, setIsConnected] = React.useState(false);
  const [ws, setWs] = React.useState<WebSocket | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000/api/ws/connect");
    setWs(socket);

    socket.onopen = () => {
      setIsConnected(true);
      console.log("✅ WebSocket connected");

      // kirim ID user (string)
      socket.send(
        JSON.stringify({
          type: "init",
          userId,
        })
      );
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.text && data.from) {
          setMessages((prev) => [...prev, data]);
        }
        console.log("📨 Message from server:", data);
      } catch {
        console.warn("Invalid message:", event.data);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("❌ WebSocket disconnected");
    };

    socket.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
    };

    return () => {
      socket.close();
    };
  }, [userId]);

  const sendMessage = (to: string, text: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "message",
          from: userId,
          to,
          text,
        })
      );

      // tampilkan langsung di UI
      setMessages((prev) => [...prev, { from: userId, to, text }]);
    } else {
      console.warn("⚠️ WebSocket belum siap.");
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket: ws, isConnected, sendMessage, messages }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return React.useContext(SocketContext);
}
