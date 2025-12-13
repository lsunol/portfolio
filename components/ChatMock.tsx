'use client';

type Message = {
  sender: "User" | "Assistant";
  text: string;
};

type ChatMockProps = {
  messages?: Message[];
  compact?: boolean;
};

const defaultMessages: Message[] = [
  {
    sender: "User",
    text: "Hola! ¿Puedes contarme algo del último proyecto?",
  },
  {
    sender: "Assistant",
    text: "Claro, fue un dashboard interactivo con apps de datos en tiempo real.",
  },
  {
    sender: "User",
    text: "Genial, suena justo a lo que necesito.",
  },
];

export function ChatMock({ messages = defaultMessages, compact = false }: ChatMockProps) {
  return (
    <div className={`w-full bg-white shadow-md rounded-3xl overflow-hidden ${compact ? "p-3" : "p-4"}`}>
      <div className="flex flex-col h-[520px]">
        <div className="px-4 py-3 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">AI Assistant</h2>
              <p className="text-xs text-slate-500">About my work and projects</p>
            </div>
            <div className="rounded-full bg-emerald-500 px-2 py-1 text-[11px] font-semibold text-white">Online</div>
          </div>
        </div>

        <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2 bg-slate-50">
          {messages.map((message, index) => (
            <div
              key={`${message.sender}-${index}`}
              className={`chat-message max-w-[80%] rounded-lg px-3 py-1.5 text-sm shadow-sm ${
                message.sender === "User"
                  ? "self-end bg-slate-900 text-white"
                  : "self-start bg-slate-200 text-slate-800"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="px-3 py-2 border-t border-slate-200 bg-white">
          <div className="flex gap-2">
            <input
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              type="text"
              readOnly
            />
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition duration-200 hover:bg-slate-800"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
