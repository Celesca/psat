"use client";

import { useState, useRef, useEffect } from "react";

interface ToolInfo {
  name: string;
  description: string;
}

interface AgentInfo {
  tools_used: ToolInfo[];
  rag_documents: string[];
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  agent?: AgentInfo;
}

const CHAT_STORAGE_KEY = "healthhub_chat_history_v1";

const defaultAssistantMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "สวัสดีค่ะ! 👋 ฉันคือผู้ช่วย AI ของ Health Hub พร้อมช่วยเรื่องสุขภาพ สิทธิพิเศษ ร้านค้า และอื่นๆ ถามได้เลยค่ะ!",
  createdAt: new Date().toISOString(),
};

function createMessage(
  role: ChatMessage["role"],
  content: string,
  agent?: AgentInfo
): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: new Date().toISOString(),
    agent,
  };
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([defaultAssistantMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAgent, setShowAgent] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch {
      // Ignore corrupted storage and continue with default message
    }
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-40)));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const resetChat = () => {
    setMessages([defaultAssistantMessage]);
    setShowAgent(null);
    localStorage.removeItem(CHAT_STORAGE_KEY);
  };

  const sendMessage = async (value?: string) => {
    const text = (value ?? input).trim();
    if (!text || loading) return;

    const userMsg = createMessage("user", text);
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const botMsg = createMessage("assistant", data.reply, data.agent);
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        createMessage("assistant", "ขออภัยค่ะ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "สุขภาพวันนี้เป็นยังไง?",
    "มีสิทธิพิเศษอะไรบ้าง?",
    "ร้านค้าใกล้ฉัน",
    "ดูอันดับของฉัน",
  ];

  return (
    <>
      {/* Floating Action Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4ade80, #16a34a)",
            border: "none",
            boxShadow: "0 4px 20px rgba(34,197,94,0.45)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            zIndex: 300,
            display: "flex",
            flexDirection: "column",
            background: "var(--gray-50)",
            maxWidth: 440,
            margin: "0 auto",
            animation: "fadeInUp 0.3s ease forwards",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M12 2a7 7 0 0 1 7 7c0 3-2 5.5-4 7l-3 4-3-4c-2-1.5-4-4-4-7a7 7 0 0 1 7-7z" />
                <circle cx="12" cy="9" r="2" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                Health Hub AI Assistant
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.7rem",
                }}
              >
                Chat history พร้อมต่อเนื่องทุกครั้งที่กลับมา
              </div>
            </div>
            <button
              onClick={resetChat}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: 20,
                minHeight: 34,
                padding: "0 10px",
                color: "white",
                fontSize: "0.68rem",
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              เริ่มใหม่
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="hide-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.role === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: 6,
                  }}
                >
                  {msg.role === "assistant" && (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "var(--green-100)",
                        color: "var(--green-700)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      AI
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "9px 12px 8px",
                      borderRadius:
                        msg.role === "user"
                          ? "16px 16px 4px 16px"
                          : "16px 16px 16px 4px",
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg, #4ade80, #16a34a)"
                          : "white",
                      color: msg.role === "user" ? "white" : "var(--gray-800)",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      boxShadow:
                        msg.role === "assistant"
                          ? "0 1px 4px rgba(0,0,0,0.06)"
                          : "none",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <p style={{ margin: 0 }}>{msg.content}</p>
                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: "0.62rem",
                        color:
                          msg.role === "user"
                            ? "rgba(255,255,255,0.8)"
                            : "var(--gray-400)",
                        textAlign: "right",
                      }}
                    >
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "var(--green-700)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      คุณ
                    </div>
                  )}
                </div>

                {/* Agent info toggle */}
                {msg.agent && (
                  <div
                    style={{
                      marginTop: 6,
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <button
                      onClick={() =>
                        setShowAgent(showAgent === i ? null : i)
                      }
                      style={{
                        background: "var(--green-50)",
                        border: "1px solid var(--green-200)",
                        borderRadius: 20,
                        padding: "4px 12px",
                        fontSize: "0.65rem",
                        color: "var(--green-700)",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      {showAgent === i ? "ซ่อน" : "ดู"} Agent Tools (
                      {msg.agent.tools_used.length})
                    </button>
                  </div>
                )}

                {/* Agent details panel */}
                {showAgent === i && msg.agent && (
                  <div
                    style={{
                      marginTop: 6,
                      background: "var(--green-50)",
                      border: "1px solid var(--green-100)",
                      borderRadius: 12,
                      padding: 12,
                      fontSize: "0.7rem",
                      animation: "fadeInUp 0.2s ease forwards",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        color: "var(--green-800)",
                        marginBottom: 6,
                        fontSize: "0.72rem",
                      }}
                    >
                      🔧 Tools ที่ Agent เลือกใช้:
                    </div>
                    {msg.agent.tools_used.map((tool, ti) => (
                      <div
                        key={ti}
                        style={{
                          background: "white",
                          borderRadius: 8,
                          padding: "6px 10px",
                          marginBottom: 4,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          border: "1px solid var(--green-200)",
                        }}
                      >
                        <span
                          style={{
                            background:
                              "linear-gradient(135deg, #4ade80, #16a34a)",
                            color: "white",
                            borderRadius: 6,
                            padding: "2px 6px",
                            fontSize: "0.6rem",
                            fontWeight: 600,
                          }}
                        >
                          TOOL
                        </span>
                        <span style={{ color: "var(--gray-700)" }}>
                          {tool.description}
                        </span>
                      </div>
                    ))}

                    <div
                      style={{
                        fontWeight: 600,
                        color: "var(--green-800)",
                        marginTop: 8,
                        marginBottom: 6,
                        fontSize: "0.72rem",
                      }}
                    >
                      📄 RAG Documents Retrieved:
                    </div>
                    {msg.agent.rag_documents.map((doc, di) => (
                      <div
                        key={di}
                        style={{
                          background: "white",
                          borderRadius: 8,
                          padding: "6px 10px",
                          marginBottom: 4,
                          color: "var(--gray-600)",
                          borderLeft: "3px solid var(--green-400)",
                          fontSize: "0.68rem",
                        }}
                      >
                        {doc}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    background: "white",
                    borderRadius: "16px 16px 16px 4px",
                    padding: "12px 18px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <div style={dotStyle(0)} />
                  <div style={dotStyle(1)} />
                  <div style={dotStyle(2)} />
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--gray-400)",
                      marginLeft: 6,
                    }}
                  >
                    กำลังเลือก tools & ค้นหา...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div
              className="hide-scroll"
              style={{
                padding: "0 12px 8px",
                display: "flex",
                gap: 6,
                overflowX: "auto",
                flexShrink: 0,
              }}
            >
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: "white",
                    border: "1px solid var(--green-200)",
                    borderRadius: 20,
                    padding: "6px 14px",
                    fontSize: "0.72rem",
                    color: "var(--green-700)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontFamily: "inherit",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div
            style={{
              padding: "10px 12px",
              paddingBottom: "calc(10px + env(safe-area-inset-bottom, 6px))",
              background: "white",
              borderTop: "1px solid var(--gray-100)",
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ถามอะไรก็ได้เลยค่ะ..."
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 24,
                border: "1.5px solid var(--gray-200)",
                fontSize: "0.85rem",
                fontFamily: "inherit",
                outline: "none",
                background: "var(--gray-50)",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--green-400)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--gray-200)";
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background:
                  input.trim() && !loading
                    ? "linear-gradient(135deg, #4ade80, #16a34a)"
                    : "var(--gray-200)",
                border: "none",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

function dotStyle(delay: number): React.CSSProperties {
  return {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "var(--green-400)",
    animation: `bounce 1.2s ease-in-out ${delay * 0.15}s infinite`,
  };
}
