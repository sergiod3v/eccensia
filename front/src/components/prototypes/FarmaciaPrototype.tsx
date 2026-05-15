import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, Pill } from "lucide-react";

const ACCENT = "#06b6d4";
const BG = "#001a1e";
const CARD = "#002830";
const MUTED = "#0e7490";

const drugs = [
  { name: "Ibuprofeno 400mg", invima: "INVIMA 2019M-0012345", stock: 240, max: 300, rx: false, category: "Analgésico" },
  { name: "Amoxicilina 500mg", invima: "INVIMA 2021M-0054321", stock: 45, max: 200, rx: true, category: "Antibiótico" },
  { name: "Losartán 50mg", invima: "INVIMA 2018M-0098765", stock: 12, max: 150, rx: true, category: "Antihipertensivo" },
  { name: "Metformina 850mg", invima: "INVIMA 2020M-0011223", stock: 88, max: 200, rx: true, category: "Antidiabético" },
  { name: "Loratadina 10mg", invima: "INVIMA 2022M-0067890", stock: 175, max: 250, rx: false, category: "Antihistamínico" },
];

const interactions = [
  { drugs: ["Ibuprofeno", "Warfarina"], severity: "Alta", effect: "Aumenta riesgo de sangrado. Evitar combinación.", source: "WHO 2024" },
  { drugs: ["Amoxicilina", "Metotrexato"], severity: "Alta", effect: "Reduce excreción renal del metotrexato. Monitoreo obligatorio.", source: "WHO 2024" },
  { drugs: ["Losartán", "Espironolactona"], severity: "Media", effect: "Riesgo de hiperpotasemia. Control de electrolitos.", source: "WHO 2024" },
  { drugs: ["Metformina", "Alcohol"], severity: "Media", effect: "Aumenta riesgo de acidosis láctica.", source: "WHO 2024" },
];

const prescriptions = [
  { id: "RX-2025-4821", paciente: "María García", medico: "Dr. Rodríguez", medicamento: "Amoxicilina 500mg x 21", estado: "Dispensada", fecha: "2025-05-14" },
  { id: "RX-2025-4820", paciente: "Carlos Ruiz", medico: "Dra. Martínez", medicamento: "Losartán 50mg x 30", estado: "Pendiente", fecha: "2025-05-14" },
  { id: "RX-2025-4819", paciente: "Ana López", medico: "Dr. Herrera", medicamento: "Metformina 850mg x 60", estado: "Dispensada", fecha: "2025-05-13" },
];

const tabs = ["Inventario", "Interacciones IA", "Prescripciones"] as const;
type Tab = (typeof tabs)[number];

export default function FarmaciaPrototype() {
  const [tab, setTab] = useState<Tab>("Inventario");
  const [search, setSearch] = useState("");

  const filtered = drugs.filter(
    (d) =>
      search === "" ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.invima.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: BG, color: "#cffafe", fontFamily: "Inter, sans-serif" }}>
      <div className="px-5 pt-4 pb-3 shrink-0" style={{ borderBottom: `1px solid rgba(6,182,212,0.12)` }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-black" style={{ color: ACCENT }}>Farmacia Digital</h1>
            <p className="text-xs" style={{ color: MUTED }}>INVIMA Vigente · Bogotá, Colombia</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(6,182,212,0.15)", color: ACCENT }}>
            INVIMA 2024 ✓
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Productos", value: drugs.length },
            { label: "Con Rx", value: drugs.filter((d) => d.rx).length },
            { label: "Stock bajo", value: drugs.filter((d) => d.stock / d.max < 0.2).length },
            { label: "Recetas hoy", value: prescriptions.length },
          ].map((k) => (
            <div key={k.label} className="rounded-lg p-2 text-center" style={{ background: CARD }}>
              <div className="text-sm font-black" style={{ color: ACCENT }}>{k.value}</div>
              <div className="text-[10px]" style={{ color: MUTED }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 px-4 pt-3 gap-3" style={{ borderBottom: `1px solid rgba(6,182,212,0.08)` }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="pb-2 text-xs font-bold transition-colors"
            style={{ color: tab === t ? ACCENT : MUTED, borderBottom: tab === t ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "Inventario" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-2" style={{ background: CARD, border: `1px solid rgba(6,182,212,0.15)` }}>
              <Search className="w-3.5 h-3.5 shrink-0" style={{ color: MUTED }} />
              <input
                type="text"
                placeholder="Buscar por nombre o código INVIMA..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-xs outline-none"
                style={{ color: "#cffafe" }}
              />
            </div>
            {filtered.map((d) => {
              const pct = Math.round((d.stock / d.max) * 100);
              const low = pct < 20;
              return (
                <div key={d.invima} className="rounded-xl p-3" style={{ background: CARD, border: `1px solid rgba(6,182,212,0.08)` }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white">{d.name}</p>
                        {d.rx && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(239,68,68,0.2)", color: "#f87171" }}>Rx</span>
                        )}
                      </div>
                      <p className="text-[10px] font-mono mt-0.5" style={{ color: MUTED }}>{d.invima}</p>
                      <p className="text-[10px]" style={{ color: MUTED }}>{d.category}</p>
                    </div>
                    {low && <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: "#ef4444" }} />}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(6,182,212,0.1)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: low ? "#ef4444" : ACCENT }} />
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: low ? "#ef4444" : MUTED }}>{d.stock}/{d.max}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "Interacciones IA" && (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl p-3" style={{ background: "rgba(6,182,212,0.06)", border: `1px solid rgba(6,182,212,0.15)` }}>
              <p className="text-xs font-bold" style={{ color: ACCENT }}>Motor de Interacciones · WHO 2024</p>
              <p className="text-xs mt-1" style={{ color: "#67e8f9" }}>Verificación automática en tiempo real al dispensar. Base de datos actualizada mensualmente.</p>
            </div>
            {interactions.map((it, i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: CARD, border: `1px solid rgba(6,182,212,0.08)` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                    <span className="text-xs font-bold text-white">{it.drugs.join(" + ")}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: it.severity === "Alta" ? "rgba(239,68,68,0.2)" : "rgba(251,191,36,0.2)", color: it.severity === "Alta" ? "#f87171" : "#FBBF24" }}>
                    {it.severity}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "#cffafe" }}>{it.effect}</p>
                <p className="text-[10px] mt-1" style={{ color: MUTED }}>Fuente: {it.source}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "Prescripciones" && (
          <div className="flex flex-col gap-2">
            {prescriptions.map((rx) => (
              <div key={rx.id} className="rounded-xl p-3" style={{ background: CARD, border: `1px solid rgba(6,182,212,0.08)` }}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-xs font-bold font-mono text-white">{rx.id}</p>
                    <p className="text-[10px]" style={{ color: MUTED }}>{rx.paciente} · {rx.medico}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: rx.estado === "Dispensada" ? "rgba(6,182,212,0.15)" : "rgba(251,191,36,0.15)", color: rx.estado === "Dispensada" ? ACCENT : "#FBBF24" }}>
                    {rx.estado === "Dispensada" && <CheckCircle className="inline w-2.5 h-2.5 mr-0.5" />}
                    {rx.estado}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "#cffafe" }}>{rx.medicamento}</p>
                <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>{rx.fecha}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
