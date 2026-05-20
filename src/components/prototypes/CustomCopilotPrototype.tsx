import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Send, User, Sparkles, BookOpen, Code2, BarChart2 } from "lucide-react";

const suggestions = [
  "Summarize Q1 sales report",
  "Draft follow-up for Construcciones Andinas",
  "Analyze churn risk from last 30 days",
];

const initialMessages = [
  { role: "assistant", text: "Hola! I'm your Eccensia Copilot — trained on your internal docs, CRM data, and past reports. What do you need?" },
  { role: "user", text: "Show me who's most at risk of churning this month." },
  { role: "assistant", text: "Analyzing CRM activity and engagement patterns...\n\n**High churn risk (3 accounts):**\n- **Logística del Norte** — 0 logins in 18 days, support ticket open\n- **Alimentos Centrales** — contract renewal in 14 days, no response to last 2 emails\n- **Distribuciones Norte** — usage dropped 62% MoM\n\nRecommend scheduling check-in calls for all three. Want me to draft outreach for each?" },
];

const tools = [
  { icon: <BookOpen className="w-3.5 h-3.5" />, label: "Knowledge Base" },
  { icon: <Code2 className="w-3.5 h-3.5" />, label: "Code Assistant" },
  { icon: <BarChart2 className="w-3.5 h-3.5" />, label: "Data Analyst" },
];

function AssistantBubble({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="rounded-2xl rounded-tl-sm p-4 max-w-[85%]" style={{ background: "#0a2a1a", border: "1px solid rgba(16,185,129,0.18)" }}>
      {lines.map((line, i) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="text-xs font-bold mb-2 mt-2 first:mt-0" style={{ color: "#34D399" }}>{line.replace(/\*\*/g, "")}</p>;
        }
        if (line.startsWith("- **")) {
          const match = line.match(/- \*\*(.+?)\*\* — (.+)/);
          if (match) return (
            <p key={i} className="text-xs mb-1 ml-2" style={{ color: "#a7f3d0" }}>
              <span className="font-semibold" style={{ color: "#34D399" }}>{match[1]}</span> — {match[2]}
            </p>
          );
        }
        if (line === "") return <div key={i} className="h-2" />;
        return <p key={i} className="text-xs leading-relaxed" style={{ color: "#a7f3d0" }}>{line}</p>;
      })}
    </div>
  );
}

export default function CustomCopilotPrototype() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: "Working on that — I'll pull from your CRM and knowledge base. Give me a moment..." }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "#021a10", color: "#e2e8f0" }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between shrink-0"
        style={{ background: "rgba(2,26,16,0.95)", borderBottom: "1px solid rgba(16,185,129,0.15)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)" }}>
            <Bot className="w-4 h-4" style={{ color: "#10B981" }} />
          </div>
          <div>
            <p className="text-xs font-mono" style={{ color: "#10B981" }}>ECCENSIA — CUSTOM COPILOT</p>
            <p className="text-xs" style={{ color: "#64748b" }}>Trained on your data · GPT-4o + RAG</p>
          </div>
        </div>
        <div className="flex gap-2">
          {tools.map((t) => (
            <div key={t.label} title={t.label} className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10B981" }}>
              {t.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="px-6 py-3 flex gap-2 overflow-x-auto shrink-0" style={{ borderBottom: "1px solid rgba(16,185,129,0.08)" }}>
        {suggestions.map((s) => (
          <button key={s} onClick={() => send(s)}
            className="whitespace-nowrap text-[10px] px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1.5 transition-colors"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#34D399" }}>
            <Sparkles className="w-2.5 h-2.5" />
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                <Bot className="w-3 h-3" style={{ color: "#10B981" }} />
              </div>
            )}
            {m.role === "user" ? (
              <div className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%]" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <p className="text-xs" style={{ color: "#a7f3d0" }}>{m.text}</p>
              </div>
            ) : (
              <AssistantBubble text={m.text} />
            )}
            {m.role === "user" && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(16,185,129,0.1)" }}>
                <User className="w-3 h-3" style={{ color: "#64748b" }} />
              </div>
            )}
          </motion.div>
        ))}
        <AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex gap-2.5 items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                <Bot className="w-3 h-3" style={{ color: "#10B981" }} />
              </div>
              <div className="rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1" style={{ background: "#0a2a1a", border: "1px solid rgba(16,185,129,0.18)" }}>
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                    className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#10B981" }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="px-6 py-4 shrink-0" style={{ borderTop: "1px solid rgba(16,185,129,0.1)" }}>
        <div className="flex gap-3 items-end rounded-2xl px-4 py-3" style={{ background: "#0a2a1a", border: "1px solid rgba(16,185,129,0.2)" }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask anything about your business..."
            rows={1}
            className="flex-1 bg-transparent text-xs text-white placeholder-[#1d5a3a] outline-none resize-none leading-relaxed"
          />
          <button onClick={() => send(input)} disabled={!input.trim()}
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
            style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)" }}>
            <Send className="w-3.5 h-3.5" style={{ color: "#10B981" }} />
          </button>
        </div>
        <p className="text-[10px] text-center mt-2" style={{ color: "#1d5a3a" }}>Copilot reads your CRM, docs, and reports in real time</p>
      </div>
    </div>
  );
}
