import { useSocket } from '@/integrations/ws/SocketProvider';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  const { sendMessage, messages, isConnected } = useSocket();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [text, setText] = useState("");

  // contoh data user dummy
  const users = [
    { id: "user2", name: "Rafi" },
    { id: "user3", name: "Dina" },
  ];

  const handleSend = () => {
    if (!selectedUser || !text.trim()) return;
    sendMessage(selectedUser, text);
    setText("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar User List */}
      <div className="w-1/4 border-r p-4">
        <h2 className="font-bold mb-2">Users</h2>
        {users.map((u) => (
          <div
            key={u.id}
            className={`cursor-pointer p-2 rounded ${
              selectedUser === u.id ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedUser(u.id)}
          >
            {u.name}
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages
            .filter(
              (m) =>
                m.from === selectedUser || m.to === selectedUser
            )
            .map((m, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  m.from === selectedUser ? "text-left" : "text-right"
                }`}
              >
                <span className="inline-block bg-gray-200 rounded px-3 py-1">
                  {m.text}
                </span>
              </div>
            ))}
        </div>

        <div className="p-2 border-t flex">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border rounded px-2"
            placeholder={
              isConnected
                ? selectedUser
                  ? "Tulis pesan..."
                  : "Pilih user dulu"
                : "WebSocket belum tersambung..."
            }
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-blue-500 text-white px-4 rounded"
            disabled={!selectedUser || !isConnected}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
