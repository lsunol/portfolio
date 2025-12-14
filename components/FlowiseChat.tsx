"use client";

import dynamic from "next/dynamic";

const FullPageChat = dynamic(
  () => import("flowise-embed-react").then((m) => m.FullPageChat),
  { ssr: false }
);

export function FlowiseChat() {
  return (
    <div className="w-full overflow-hidden rounded-3xl neumorphic-surface">
      <FullPageChat
        chatflowid="c4f62f59-b44b-4f5b-b4d2-c3838e152c64"
        apiHost="https://flowise.lluissunol.duckdns.org"
        theme={{
          chatWindow: {
            showTitle: false,
            welcomeMessage:
              "Hi! I'm Qiri, the personal assistant that Lluís designed, defined, and implemented using artificial intelligence. I'm here to help you learn more about his professional profile, experience, and skills. How can I help you?",
            backgroundColor: "#e8edf5",
            height: 580,
            fontSize: 15,
            botMessage: {
              backgroundColor: "#ffffff",
              textColor: "#334155",
              showAvatar: false,
            },
            userMessage: {
              backgroundColor: "#0f172a",
              textColor: "#ffffff",
              showAvatar: false,
            },
            textInput: {
              placeholder: "Type your question...",
              backgroundColor: "#ffffff",
              textColor: "#0f172a",
              sendButtonColor: "#0f172a",
            },
            footer: {
              textColor: "#64748b",
              text: "",
              company: "",
              companyLink: "",
            },
          },
          customCSS: `
            .chatbot-chat-view {
              padding-top: 20px !important;
            }
            div > div > div > div.w-full.px-5.pt-2.pb-1 {
              margin-bottom: 20px !important;
              padding-bottom: 0px !important;
            }
            div > div > div > span.w-full.text-center {
              display: none !important;
            }
          `,
        }}
      />
    </div>
  );
}
