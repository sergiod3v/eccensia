import { useState } from "react";
import { Send, TrendingUp, TrendingDown } from "lucide-react";

const ACCENT = "#e879f9";
const BG = "#0d0014";
const CARD = "#160020";
const MUTED = "#7e22ce";

const budget = [
  { category: "Vivienda", allocated: 1800000, spent: 1800000, icon: "🏠" },
  { category: "Alimentación", allocated: 600000, spent: 720000, icon: "🛒" },
  { category: "Transporte", allocated: 300000, spent: 245000, icon: "🚌" },
  { category: "Entretenimiento", allocated: 200000, spent: 310000, icon: "🎬" },
  { category: "Ahorro", allocated: 500000, spent: 500000, icon: "💰" },
];

const income = 3850000;
const totalSpent = budget.reduce((s, b) => s + b.spent, 0);

const initialMessages = [
  { role: "ai", text: "Hola 👋 Analicé tus finanzas de mayo. Estás gastando 8.5% más de lo planeado. ¿Quieres ver cómo optimizar?" },
  { role: "user", text: "¿En qué categorías me estoy pasando?" },
  { role: "ai", text: "Alimentación (+$120k) y Entretenimiento (+$110k) son las principales. Si reduces comer fuera de casa 2 veces por semana, ahorras ~$80k/mes." },
];

const chips = ["¿Cómo aumento mi ahorro?", "Ver proyección anual", "Mejores inversiones COP", "Gastos fijos vs variables"];

const tabs = ["Resumen", "Asesor IA"] as const;
type Tab = (typeof tabs)[number];

export default function PersonalFinancePrototype() {
  const [tab, setTab] = useState<Tab>("Resumen");
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      { role: "ai", text: "Analizando tu situación financiera... Basado en tus patrones de gasto, te recomiendo priorizar el fondo de emergencia (3 meses de gastos = $11.6M COP) antes de invertir. ¿Te ayudo a crear un plan paso a paso?" },
    ]);
    setInput("");
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: BG, color: "#fae8ff", fontFamily: "Inter, sans-serif" }}>
      <div className="px-5 pt-4 pb-3 shrink-0" style={{ borderBottom: `1px solid rgba(232,121,249,0.12)` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-black" style={{ color: ACCENT }}>Finanzas Personales IA</h1>
            <p className="text-xs" style={{ color: MUTED }}>Mayo 2025 · Bogotá, Colombia</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(232,121,249,0.15)", color: ACCENT }}>
            {totalSpent > income * 0.9 ? "⚠ Revisar" : "✓ En control"}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Ingresos", value: `$${(income / 1000000).toFixed(2)}M` },
            { label: "Gastos", value: `$${(totalSpent / 1000000).toFixed(2)}M` },
            { label: "Balance", value: `$${((income - totalSpent) / 1000).toFixed(0)}k` },
          ].map((k) => (
            <div key={k.label} className="rounded-lg p-2 text-center" style={{ background: CARD }}>
              <div className="text-sm font-black" style={{ color: ACCENT }}>{k.value}</div>
              <div className="text-[10px]" style={{ color: MUTED }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 px-4 pt-3 gap-3" style={{ borderBottom: `1px solid rgba(232,121,249,0.08)` }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="pb-2 text-xs font-bold transition-colors"
            style={{ color: tab === t ? ACCENT : MUTED, borderBottom: tab === t ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "Resumen" && (
          <div className="flex flex-col gap-2">
            {budget.map((b) => {
              const pct = Math.round((b.spent / b.allocated) * 100);
              const over = b.spent > b.allocated;
              return (
                <div key={b.category} className="rounded-xl p-3" style={{ background: CARD, border: `1px solid rgba(232,121,249,0.08)` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{b.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{b.category}</p>
                        <p className="text-[10px]" style={{ color: MUTED }}>
                          ${b.spent.toLocaleString("es-CO")} / ${b.allocated.toLocaleString("es-CO")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {over ? <TrendingUp className="w-3.5 h-3.5" style={{ color: "#ef4444" }} /> : <TrendingDown className="w-3.5 h-3.5" style={{ color: "#84cc16" }} />}
                      <span className="text-xs font-bold" style={{ color: over ? "#ef4444" : "#84cc16" }}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(232,121,249,0.1)" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${Math.min(pct, 100)}%`, background: over ? "#ef4444" : ACCENT }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "Asesor IA" && (
          <div className="flex flex-col h-full" style={{ minHeight: "300px" }}>
            <div className="flex-1 flex flex-col gap-2 mb-3 overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[80%] rounded-xl px-3 py-2 text-xs"
                    style={{
                      background: m.role === "user" ? "rgba(232,121,249,0.2)" : CARD,
                      border: m.role === "ai" ? `1px solid rgba(232,121,249,0.12)` : "none",
                      color: m.role === "user" ? "#fae8ff" : "#f3e8ff",
                    }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3 shrink-0">
              {chips.map((c) => (
                <button key={c} onClick={() => send(c)}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors"
                  style={{ background: "rgba(232,121,249,0.1)", border: `1px solid rgba(232,121,249,0.2)`, color: ACCENT }}>
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-xl px-3 py-2 shrink-0"
              style={{ background: CARD, border: `1px solid rgba(232,121,249,0.2)` }}>
              <input
                type="text"
                placeholder="Pregunta sobre tus finanzas..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                className="flex-1 bg-transparent text-xs outline-none"
                style={{ color: "#fae8ff" }}
              />
              <button onClick={() => send(input)} className="p-1.5 rounded-lg" style={{ background: "rgba(232,121,249,0.2)", color: ACCENT }}>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
