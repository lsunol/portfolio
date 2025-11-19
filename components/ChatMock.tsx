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
    <div
      className={`neumorphic-surface flex flex-col rounded-3xl p-5 ${compact ? "gap-3" : "gap-4"}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Chatbot</p>
          <p className="text-sm font-semibold text-slate-900">Lluís AI</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-slate-500 shadow-inner">
          💬
        </div>
      </div>
      <div className={`neumorphic-inset flex flex-col rounded-2xl bg-white/75 ${compact ? "p-3" : "p-4"} gap-3`}>
        {messages.map((message, index) => (
          <p
            key={`${message.sender}-${index}`}
            className={`w-fit max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
              message.sender === "User"
                ? "self-end bg-slate-900 text-white"
                : "bg-white/90 text-slate-800"
            }`}
          >
            {message.text}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-inner">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          className="flex-1 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
          readOnly
        />
        <button
          type="button"
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
